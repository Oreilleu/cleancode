import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { UserRole } from "../../../interfaces/user.interface";

export class Register {
  private userService: UserModel = new UserModel();

  public handler: Route["handler"] = (request: Request, response: Response) => {
    const {
      firstName = "Name",
      lastName = "lastname",
      email = "newemail@mail.com",
      password = "123Akkodis",
    } = request.body;

    this.userService.create({
      firstName,
      lastName,
      email,
      password,
      role: UserRole.USER,
    });

    return response.status(200).json({
      message: "Register Route",
      requestBody: request.body.msg,
    });
  };
}
