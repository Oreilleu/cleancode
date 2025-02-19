import { NextFunction, Request, Response } from "express";
import { JsonWebTokenHandler } from "../utils/jsonwebtoken.class";
import {
  serverErrorMessage,
  tokenErrorMessage,
} from "../enums/error-message.enum";
import { httpStatusCode } from "../enums/http-status-code.enum";

export class AuthMiddleware {
  private jsonWebTokenHandler: JsonWebTokenHandler = new JsonWebTokenHandler();

  public async checkToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ message: tokenErrorMessage.INVALID_SESSION_TOKEN });
      return;
    }

    try {
      await this.jsonWebTokenHandler.verifyJsonWebToken(token);
      next();
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        res
          .status(httpStatusCode.FORBIDDEN)
          .json({ message: tokenErrorMessage.INVALID_SESSION_TOKEN });
        return;
      }
      res
        .status(500)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  }
}
