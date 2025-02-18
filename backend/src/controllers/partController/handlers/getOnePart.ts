import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import {
  partErrorMessage,
  sequelizeErrorMessage,
} from "../../../enums/error-message.enum";

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
          .json({ message: partErrorMessage.PART_NOT_FOUND });
        return;
      }

      response.status(httpStatusCode.OK).json(part);
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
