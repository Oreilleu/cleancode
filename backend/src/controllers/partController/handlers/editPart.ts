import { Request, Response } from "express";
import { PartBody } from "../../../interfaces/part.interface";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import { zodPartEditSchema } from "../../../utils/zod/schema/partSchema";
import {
  partErrorMessage,
  sequelizeErrorMessage,
  serverErrorMessage,
} from "../../../enums/error-message.enum";

export class EditPart {
  private partModel: PartModel = new PartModel();
  private zodHandler: ZodHandler = new ZodHandler();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, Partial<PartBody>>,
    response: Response
  ) => {
    try {
      const errors = await this.zodHandler.validationBody(
        request.body,
        zodPartEditSchema
      );

      if (this.zodHandler.isValidationFail(errors)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: serverErrorMessage.BAD_REQUEST, errors });
        return;
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
      return;
    }

    try {
      const part = await this.partModel.edit(request.params.id, request.body);

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

      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
    }
  };
}
