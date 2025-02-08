import jwt, { JwtPayload } from "jsonwebtoken";
import { expiresIn } from "../enums/expires-in.enum";

export class JsonWebTokenHandler {
  private SECRET_JWT_KEY: string = process.env.JWT_SECRET_KEY || "";

  public generateJsonWebToken = async (
    data: JwtPayload,
    expiresIn: expiresIn
  ) => {
    return jwt.sign({ data }, this.SECRET_JWT_KEY, { expiresIn });
  };

  public verifyJsonWebToken = async (token: string) => {
    return jwt.verify(token, this.SECRET_JWT_KEY);
  };
}
