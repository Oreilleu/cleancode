import { Request, Response } from "express";
import { PartBody } from "../../../interfaces/part.interface";
import { Route } from "../../../interfaces/route.interface";
import { PartModel } from "../../../services/sequelize/models/part.model";
import { ZodHandler } from "../../../utils/zod.class";
import { ParamsDictionary } from "express-serve-static-core";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { errorMessage } from "../../../enums/error-message.enum";
import { partEditSchema } from "../../../utils/zodSchema";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";

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
        partEditSchema
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
      const part = await this.partModel.edit(request.params.id, request.body);

      if (!part) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Pièce non trouvée" });
        return;
      }

      response.status(httpStatusCode.OK).json(part);
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
