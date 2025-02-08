import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Route } from "../../../interfaces/route.interface";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { errorMessage } from "../../../enums/error-message.enum";
import { DatabaseUser, UserDTO } from "../../../interfaces/user.interface";
import { JsonWebTokenHandler } from "../../../utils/jsonwebtoken.class";
import { expiresIn } from "../../../enums/expires-in.enum";
import { LoginBody } from "../../../interfaces/login.interface";
import { ZodHandler } from "../../../utils/zod.class";
import { loginSchema } from "../../../utils/zodSchema";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";

export class Login {
  private userService: UserModel = new UserModel();
  private jsonWebTokenHandler: JsonWebTokenHandler = new JsonWebTokenHandler();
  private zodHandler: ZodHandler = new ZodHandler();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, LoginBody>,
    response: Response
  ) => {
    const { email, password } = request.body;
    let dbUser: DatabaseUser | null = null;
    let isWrongPassword: boolean = true;
    let token: string | null = null;
    let errors: ZodErrorsFormatted = [];

    try {
      errors = await this.zodHandler.validationBody(request.body, loginSchema);
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (this.zodHandler.isValidationFail(errors)) {
      response
        .status(httpStatusCode.BAD_REQUEST)
        .json({ message: errorMessage.BAD_REQUEST, errors });
      return;
    }

    try {
      dbUser = await this.getDatabaseUser(email);
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (this.isUserNotRegistered(dbUser)) {
      response
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ message: errorMessage.UNREGISTERED_USER });
      return;
    }

    try {
      isWrongPassword = !(await this.isPasswordValid(dbUser, password));
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (isWrongPassword) {
      response
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ message: errorMessage.WRONG_PASSWORD });
      return;
    }

    try {
      token = (await this.jsonWebTokenHandler.generateJsonWebToken(
        this.getUserDto(dbUser),
        expiresIn["24_HOUR"]
      )) as string;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    return response.status(httpStatusCode.OK).json({
      user: this.getUserDto(dbUser),
      token: token,
    });
  };

  private getDatabaseUser = async (
    email: string
  ): Promise<DatabaseUser | null> => {
    try {
      return await this.userService.findByEmail(email);
    } catch (error) {
      throw error;
    }
  };

  private getUserDto = (user: DatabaseUser): UserDTO => {
    const { password, ...restUser } = user;
    return restUser;
  };

  private isPasswordValid = async (
    dbUser: DatabaseUser,
    password: string
  ): Promise<boolean> => {
    try {
      return await bcrypt.compare(password, dbUser.password);
    } catch (error) {
      throw error;
    }
  };

  private isUserNotRegistered = (user: DatabaseUser | null): user is null => {
    return user === null;
  };
}
