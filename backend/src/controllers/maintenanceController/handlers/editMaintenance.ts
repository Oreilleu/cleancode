import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { MaintenanceModel } from "../../../services/sequelize/models/maintenance.model";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { MaintenanceBody } from "../../../interfaces/maintenance.interface";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import { zodMaintenanceEditSchema } from "../../../utils/zod/schema/maintenance.schema";
import {
    maintenanceErrorMessage,
    sequelizeErrorMessage,
    serverErrorMessage,
} from "../../../enums/error-message.enum";

export class EditMaintenance {
    private maintenanceModel: MaintenanceModel = new MaintenanceModel();
    private zodHandler: ZodHandler = new ZodHandler();

    public handler: Route["handler"] = async (
        request: Request<ParamsDictionary, any, Partial<MaintenanceBody>>,
        response: Response
    ) => {
        try {
            const errors = await this.zodHandler.validationBody(
                request.body,
                zodMaintenanceEditSchema
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
            const maintenance = await this.maintenanceModel.edit(
                request.params.id,
                request.body
            );

            if (!maintenance) {
                response
                    .status(httpStatusCode.NOT_FOUND)
                    .json({ message: maintenanceErrorMessage.MAINTENANCE_NOT_FOUND });
                return;
            }

            response.status(httpStatusCode.OK).json(maintenance);
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
