import { Request, Response } from "express";
import { ClientModel } from "../../../services/sequelize/models/client.model";
import { ZodHandler } from "../../../utils/zod.class";
import { ParamsDictionary } from "express-serve-static-core";
import { Route } from "../../../interfaces/route.interface";
import { createClientSchema } from "../../../utils/zodSchema";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { errorMessage } from "../../../enums/error-message.enum";
import { ClientBody } from "src/interfaces/client.interface";

export class createClient {
  private zodHandler: ZodHandler = new ZodHandler();
  private clientModel: ClientModel = new ClientModel();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, ClientBody>,
    response: Response
  ) => {
    const { body } = request;

    try {
      const errors = await this.zodHandler.validationBody(
        body,
        createClientSchema
      );

      if (this.zodHandler.isValidationFail(errors)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: errorMessage.BAD_REQUEST, errors });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const client = await this.clientModel.findByEmail(
        body.email
      );

      if (client) {
        response.status(httpStatusCode.NOT_FOUND).json({
          message: `Ce Client exsite déjà`,
        });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }


    try {
      const newClient = await this.clientModel.create(body);

      response.status(httpStatusCode.CREATED).json({
        data: newClient,
      });
      return;
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
      return;
    }
  };
}