import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { AuthMiddleware } from "../../../middlewares/auth.middleware";

export class VerifyToken {
  private authMiddleware: AuthMiddleware = new AuthMiddleware();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    response.status(httpStatusCode.OK).end();
  };

  public localMiddlewares: Route["localMiddlewares"] = [
    this.authMiddleware.checkToken.bind(this.authMiddleware),
  ];
}
