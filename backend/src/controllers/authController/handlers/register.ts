import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Route } from "../../../interfaces/route.interface";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { UserDTO } from "../../../interfaces/user.interface";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterBody } from "../../../interfaces/register.interface";
import { ZodHandler } from "../../../utils/zod.class";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { registerSchema } from "../../../utils/zodSchema";
import { errorMessage } from "../../../enums/error-message.enum";
import { DEFAULT_BCRYPT_SALT } from "../../../utils/constant";
import { JsonWebTokenHandler } from "../../../utils/jsonwebtoken.class";
import { expiresIn } from "../../../enums/expires-in.enum";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MongooseService } from "../../../services/mongoose/mongoose.service";
import { UserRole } from "../../../enums/user-role.enum";
export class Register {
  private jsonWebTokenHandler: JsonWebTokenHandler = new JsonWebTokenHandler();
  private zodHandler: ZodHandler = new ZodHandler();
  private userService!: UserModel;

  constructor() {
    MongooseService.get().then((mongooseService) => {
      this.userService = mongooseService.userService;
    });
  }
  
  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, RegisterBody>,
    response: Response
  ) => {
    const body = request.body;
    let errors: ZodErrorsFormatted = [];
    let token: string | null = null;

    try {
      errors = await this.zodHandler.validationBody(body, registerSchema);
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
    }

    if (this.zodHandler.isValidationFail(errors)) {
      response
        .status(httpStatusCode.BAD_REQUEST)
        .json({ message: errorMessage.BAD_REQUEST, errors });
      return;
    }

    try {
      const hashPassword = await bcrypt.hash(
        body.password,
        DEFAULT_BCRYPT_SALT
      );
      body.password = hashPassword;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      await this.createUser(body);
    } catch (error: any) {
      const EMAIL_ALREADY_REGISTERED =
        error.name === "MongoServerError" && error.code === 11000;

      if (EMAIL_ALREADY_REGISTERED) {
        response
          .status(httpStatusCode.CONFLICT)
          .json({ message: errorMessage.ALREADY_REGISTERED_EMAIL });
        return;
      }

      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      token = (await this.jsonWebTokenHandler.generateJsonWebToken(
        this.getUserDto(body),
        expiresIn["24_HOUR"]
      )) as string;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    return response.status(httpStatusCode.CREATED).json({
      user: this.getUserDto(body),
      token: token,
    });
  };

  private getUserDto = (user: RegisterBody): UserDTO => {
    const { password, ...restUser } = user;
    return { ...restUser, role: UserRole.USER };
  };

  private createUser = async (user: RegisterBody) => {
    try {
      return await this.userService.create({
        ...user,
        role: UserRole.USER,
      });
    } catch (error) {
      throw error;
    }
  };
}
