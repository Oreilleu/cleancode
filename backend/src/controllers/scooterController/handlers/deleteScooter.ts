import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";

export class DeleteScooter {
  private scooterModel: ScooterModel = new ScooterModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const deletedScooter = await this.scooterModel.delete(request.params.id);

      if (!deletedScooter) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Scooter non trouvé" });
        return;
      }

      response.status(httpStatusCode.OK).json();
    } catch (error: any) {
      const isUuidUnvalid =
        error.name === "SequelizeDatabaseError" &&
        error.parent.code === "22P02";

      if (isUuidUnvalid) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: "L'id n'est pas valide" });
        return;
      }

      response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
