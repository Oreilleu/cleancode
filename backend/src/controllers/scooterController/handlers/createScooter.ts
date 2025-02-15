import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import {
  ScooterBody,
  ScooterDatabase,
} from "../../../interfaces/scooter.interface";
import { ZodHandler } from "../../../utils/zod.class";
import { ParamsDictionary } from "express-serve-static-core";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { errorMessage } from "../../../enums/error-message.enum";
import { scooterSchema } from "../../../utils/zodSchema";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { Model } from "sequelize";

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
        scooterSchema
      );
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
      createdScooter = await this.scooterModel.create(request.body);
    } catch (error: any) {
      const isUniqueConstraintError =
        error.name === "SequelizeUniqueConstraintError" &&
        error.parent.code === "23505";

      if (isUniqueConstraintError) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: "Le modèle du scooter doit être unique." });
        return;
      }

      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    if (!createdScooter) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    return response.status(httpStatusCode.CREATED).json({
      scooter: createdScooter,
    });
  };
}
