import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { ScooterModel } from "../../../services/sequelize/models/scooter.model";
import { ZodHandler } from "../../../utils/zod.class";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { scooterEditSchema } from "../../../utils/zodSchema";
import { ParamsDictionary } from "express-serve-static-core";
import { ScooterBody } from "../../../interfaces/scooter.interface";
import { errorMessage } from "../../../enums/error-message.enum";

export class EditScooter {
  private scooterModel: ScooterModel = new ScooterModel();
  private zodHandler: ZodHandler = new ZodHandler();

  public handler: Route["handler"] = async (
    request: Request<ParamsDictionary, any, Partial<ScooterBody>>,
    response: Response
  ) => {
    try {
      let errors: ZodErrorsFormatted = [];

      try {
        errors = await this.zodHandler.validationBody(
          request.body,
          scooterEditSchema
        );
      } catch (error) {
        response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: errorMessage.INTERNAL_SERVER_ERROR });
        return;
      }

      if (this.zodHandler.isValidationFail(errors)) {
        response
          .status(httpStatusCode.BAD_REQUEST)
          .json({ message: errorMessage.BAD_REQUEST, errors });
        return;
      }

      const scooter = await this.scooterModel.edit(
        request.params.id,
        request.body
      );

      if (!scooter) {
        response
          .status(httpStatusCode.NOT_FOUND)
          .json({ message: "Scooter non trouvé" });
        return;
      }

      response.status(httpStatusCode.OK).json(scooter);
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
