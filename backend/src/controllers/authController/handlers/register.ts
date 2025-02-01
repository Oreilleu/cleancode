import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { UserDTO, UserRole } from "../../../interfaces/user.interface";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterBody } from "../../../interfaces/register.interface";
import { ZodHandler } from "../../../utils/zod.class";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { registerSchema } from "../../../utils/zodSchema";
import { errorMessage } from "../../../enums/error-message.enum";
import bcrypt from "bcrypt";
import { DEFAULT_BCRYPT_SALT } from "../../../utils/constant";
import { JsonWebTokenHandler } from "../../../utils/jsonwebtoken.class";
import { expiresIn } from "../../../enums/expires-in.enum";

export class Register {
  private userService: UserModel = new UserModel();
  private jsonWebTokenHandler: JsonWebTokenHandler = new JsonWebTokenHandler();
  private zodHandler: ZodHandler = new ZodHandler();

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
        .status(500)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
    }

    if (this.zodHandler.isValidationFail(errors)) {
      response.status(400).json({ message: errorMessage.BAD_REQUEST, errors });
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
        .status(500)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      this.userService.create({
        ...body,
        role: UserRole.USER,
      });
    } catch (error) {
      response
        .status(500)
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
        .status(500)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    return response.status(201).json({
      user: this.getUserDto(body),
      token: token,
    });
  };

  private getUserDto = (user: RegisterBody): UserDTO => {
    const { password, ...restUser } = user;
    return { ...restUser, role: UserRole.USER };
  };
}
