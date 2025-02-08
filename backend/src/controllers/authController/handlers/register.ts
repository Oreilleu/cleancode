import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import { AuthController } from "..";
import { Connection } from "mongoose";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { UserRole } from "../../../enums/user-role.enum";
import { MongooseService } from "../../../services/mongoose/mongoose.service";
export class Register {
  private userService!: UserModel;

  constructor(private authController: AuthController) {
    MongooseService.get().then((mongooseService) => {
      this.userService = mongooseService.userService;
    });
  }
  
  public handler: Route["handler"] = async (request: Request, response: Response) => {
    const user = {
      firstName: "Aurélien",
      lastName: "Picard",
      email: "email@mail.com",
      role: UserRole.USER,
    };

    await this.userService.create(user);

    return response.status(200).json({
      message: "Register Route",
      requestBody: request.body.msg,
    });
  };
}
