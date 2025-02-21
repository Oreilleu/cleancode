import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { MaintenanceStockPartModel } from "../../../services/sequelize/models/maintenanceStockPart.model";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { MaintenanceStockPartBody } from "../../../interfaces/maintenanceStockPart.interface";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import { zodMaintenanceStockPartEditSchema } from "../../../utils/zod/schema/maintenanceStockPart.schema";
import {
    maintenanceStockPartErrorMessage,
    sequelizeErrorMessage,
    serverErrorMessage,
} from "../../../enums/error-message.enum";

export class EditMaintenanceStockPart {
    private maintenanceStockPartModel: MaintenanceStockPartModel = new MaintenanceStockPartModel();
    private zodHandler: ZodHandler = new ZodHandler();

    public handler: Route["handler"] = async (
        request: Request<ParamsDictionary, any, Partial<MaintenanceStockPartBody>>,
        response: Response
    ) => {
        try {
            const errors = await this.zodHandler.validationBody(
                request.body,
                zodMaintenanceStockPartEditSchema
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
            const maintenanceStockPart = await this.maintenanceStockPartModel.edit(
                request.params.id,
                request.body
            );

            if (!maintenanceStockPart) {
                response
                    .status(httpStatusCode.NOT_FOUND)
                    .json({ message: maintenanceStockPartErrorMessage.MAINTENANCE_STOCK_PART_NOT_FOUND });
                return;
            }

            response.status(httpStatusCode.OK).json(maintenanceStockPart);
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
