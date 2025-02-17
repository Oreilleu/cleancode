import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { scooterErrorMessage } from "../../../enums/error-message.enum";

export class GetPartByModel {
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { scooterModel } = request.params;
      const part = await this.partModel.findByScooterModel(scooterModel);

      if (!part) {
        response.status(httpStatusCode.NOT_FOUND).json({
          message: scooterErrorMessage.SCOOTER_NOT_FOUND,
        });
        return;
      }

      response.status(httpStatusCode.OK).json(part);
    } catch (error: any) {
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
