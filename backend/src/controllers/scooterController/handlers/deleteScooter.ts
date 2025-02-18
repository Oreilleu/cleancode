import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import {
  scooterErrorMessage,
  sequelizeErrorMessage,
} from "../../../enums/error-message.enum";

export class DeleteScooter {
  private scooterModel: ScooterModel = new ScooterModel();
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const scooter = await this.scooterModel.findById(request.params.id);

      if (!scooter) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: scooterErrorMessage.SCOOTER_NOT_FOUND });
        return;
      }

      await this.partModel.deleteByScooterModel(scooter.get().model);

      await this.scooterModel.delete(request.params.id);

      response.status(httpStatusCode.OK).end();
    } catch (error: any) {
      if (isUuidUnvalidError(error)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: sequelizeErrorMessage.INVALID_UUID });
        return;
      }

      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
