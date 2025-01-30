import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import { AuthController } from "..";
import { Connection } from "mongoose";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { UserRole } from "../../../interfaces/user.interface";

export class Register {
  private db: Connection | undefined;
  private userService: UserModel;

  constructor(private authController: AuthController) {
    this.db = this.authController.getDatabase();
    this.userService = new UserModel();
  }

  public handler: Route["handler"] = (request: Request, response: Response) => {
    const user = {
      firstName: "Aurélien",
      lastName: "Picard",
      email: "email@mail.com",
      role: UserRole.USER,
    };

    this.userService.create(user);

    return response.status(200).json({
      message: "Register Route",
      requestBody: request.body.msg,
    });
  };
}
