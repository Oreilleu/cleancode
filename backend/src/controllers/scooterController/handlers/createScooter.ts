import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import {
  ScooterBody,
  ScooterDatabase,
} from "../../../interfaces/scooter.interface";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { Model } from "sequelize";
import { zodScooterSchema } from "../../../utils/zod/schema/scooter.schema";
import {
  scooterErrorMessage,
  serverErrorMessage,
} from "../../../enums/error-message.enum";

export class CreateScooter {
  private zodHandler: ZodHandler = new ZodHandler();
  private scooterModel: ScooterModel = new ScooterModel();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, ScooterBody>,
    response: Response
  ) => {
    let errors: ZodErrorsFormatted = [];
    let createdScooter: Model<ScooterDatabase> | null = null;

    try {
      errors = await this.zodHandler.validationBody(
        request.body,
        zodScooterSchema
      );
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (this.zodHandler.isValidationFail(errors)) {
      response
        .status(httpStatusCode.BAD_REQUEST)
        .json({ message: serverErrorMessage.BAD_REQUEST, errors });
      return;
    }

    try {
      createdScooter = await this.scooterModel.create(request.body);
    } catch (error: any) {
      const isUniqueConstraintError =
        error.name === "SequelizeUniqueConstraintError" &&
        error.parent.code === "23505";

      if (isUniqueConstraintError) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: scooterErrorMessage.MODEL_UNIQUE });
        return;
      }

      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (!createdScooter) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    return response.status(httpStatusCode.CREATED).json({
      scooter: createdScooter,
    });
  };
}
