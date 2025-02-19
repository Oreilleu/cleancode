import { Request, Response } from "express";
import { ClientModel } from "../../../services/sequelize/models/client.model";
import { Route } from "../../../interfaces/route.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { errorMessage } from "../../../enums/error-message.enum";

export class getAllClient {
  private clientModel: ClientModel = new ClientModel();

  public handler: Route["handler"] = async (
    request: Request,
    response: Response
  ) => {
    try {
      const clients = await this.clientModel.findAll();

      response.status(httpStatusCode.OK).json(clients);
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  };
}
