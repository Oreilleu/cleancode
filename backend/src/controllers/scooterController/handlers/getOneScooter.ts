import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { Route } from "../../../interfaces/route.interface";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";

export class GetOneScooter {
  private scooterModel: ScooterModel = new ScooterModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const scooter = await this.scooterModel.findById(request.params.id);

      if (!scooter) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Scooter non trouvé" });
        return;
      }

      response.status(httpStatusCode.OK).json(scooter);
    } catch (error: any) {
      if (isUuidUnvalidError(error)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: "L'id n'est pas valide" });
        return;
      }
      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
