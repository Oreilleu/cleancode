import { Request, Response } from "express";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { ZodHandler } from "../../../utils/zod.class";
import { ParamsDictionary } from "express-serve-static-core";
import { PartBody } from "../../../interfaces/part.interface";
import { Route } from "../../../interfaces/route.interface";
import { partSchema } from "../../../utils/zodSchema";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { errorMessage } from "../../../enums/error-message.enum";

export class CreatePart {
  private zodHandler: ZodHandler = new ZodHandler();
  private scooterModel: ScooterModel = new ScooterModel();
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, PartBody>,
    response: Response
  ) => {
    try {
      const errors = await this.zodHandler.validationBody(
        request.body,
        partSchema
      );

      if (this.zodHandler.isValidationFail(errors)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: errorMessage.BAD_REQUEST, errors });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const scooter = await this.scooterModel.findByModel(
        request.body.scooterModel
      );

      if (!scooter) {
        response.status(httpStatusCode.NOT_FOUND).json({
          message: `Le modèle de scooter n'existe pas`,
        });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const existingPart = await this.partModel.findByModelAndPartName(
        request.body.scooterModel,
        request.body.partName
      );

      if (existingPart) {
        response.status(httpStatusCode.BAD_REQUEST).json({
          message: "Cette pièce existe déjà pour ce modèle de scooter",
        });
        return;
      }
    } catch (error) {
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: errorMessage.INTERNAL_SERVER_ERROR,
      });
    }

    try {
      const newPart = await this.partModel.create(request.body);

      response.status(httpStatusCode.CREATED).json({
        data: newPart,
      });
      return;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  };
}
