import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";

export class GetOnePart {
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const part = await this.partModel.findById(request.params.id);

      if (!part) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Pièce non trouvé." });
        return;
      }

      response.status(httpStatusCode.OK).json(part);
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
