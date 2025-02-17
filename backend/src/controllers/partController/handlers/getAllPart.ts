import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { serverErrorMessage } from "../../../enums/error-message.enum";

export class GetAllPart {
  private partModel: PartModel = new PartModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const parts = await this.partModel.findAll();
      response.status(httpStatusCode.OK).json(parts);
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  };
}
