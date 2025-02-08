import { NextFunction, Request, Response } from "express";
import { JsonWebTokenHandler } from "../utils/jsonwebtoken.class";
import { errorMessage } from "../enums/error-message.enum";

export class AuthMiddleware {
  private jsonWebTokenHandler: JsonWebTokenHandler = new JsonWebTokenHandler();

  public async checkToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: errorMessage.INVALID_SESSION_TOKEN });
      return;
    }

    try {
      // TODO - AAjouté les données de l'utilisateur dans la requête ?
      await this.jsonWebTokenHandler.verifyJsonWebToken(token);
      console.log("Token is valid");
      next();
    } catch (error) {
      res.status(500).json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  }
}
