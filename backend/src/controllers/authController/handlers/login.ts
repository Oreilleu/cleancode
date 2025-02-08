import { NextFunction, Request, Response } from "express";
import { errorMessage } from "../../../enums/error-message.enum";
import { Route } from "../../../interfaces/route.interface";
import { AuthController } from "..";
import { Connection } from "mongoose";
import { UserModel } from "../../../services/mongoose/models/user.model";
import { MongooseService } from "../../../services/mongoose/mongoose.service";

export class Login {
  private userService!: UserModel;

  constructor(private authController: AuthController) {
     MongooseService.get().then((mongooseService) => {
      this.userService = mongooseService.userService;
    });
  }

  public handler: Route["handler"] = (request: Request, response: Response) => {
    return response.status(200).json({
      message: "Login Route",
      requestBody: request.body.msg,
    });
  };

  public middlewares: Route["localMiddlewares"] = [
    //-------------------------------------------------------------------------
    (req: Request, res: Response, next: NextFunction) => {
      console.log("LOCAL MIDDLEWARE LOGIN 1");

      if (!req.body.token) {
        return res
          .status(401)
          .json({ message: errorMessage.INVALID_SESSION_TOKEN });
      }

      next();
    },
    //-------------------------------------------------------------------------
    (req: Request, res: Response, next: NextFunction) => {
      console.log("LOCAL MIDDLEWARE LOGIN 2");

      if (!req.body.msg) {
        return res.status(400).json({ message: "message not found" });
      }

      next();
    },
    //-------------------------------------------------------------------------
  ];
}
