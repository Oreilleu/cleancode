import { Request, Response } from "express";
import { errorMessage } from "../../../enums/error-message.enum";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";

export class DeletePart {
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const deletedPart = await this.partModel.delete(request.params.id);

      if (!deletedPart) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Pièce non trouvée" });
        return;
      }

      response.status(httpStatusCode.OK).end();
    } catch (error: any) {
      if (isUuidUnvalidError(error)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: "L'id n'est pas valide" });
        return;
      }
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
    }
  };
}
