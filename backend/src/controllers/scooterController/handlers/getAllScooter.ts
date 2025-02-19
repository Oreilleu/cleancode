import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { Route } from "../../../interfaces/route.interface";

export class GetAllScooter {
  private scooterModel: ScooterModel = new ScooterModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const scooters = await this.scooterModel.findAll();

      response.status(httpStatusCode.OK).json({ scooters });
    } catch (error) {
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
