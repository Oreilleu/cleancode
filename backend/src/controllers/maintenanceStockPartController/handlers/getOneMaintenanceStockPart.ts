import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceStockPartModel } from "../../../services/sequelize/models/maintenanceStockPart.model";
import { Route } from "../../../interfaces/route.interface";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import {
    maintenanceStockPartErrorMessage,
    sequelizeErrorMessage,
} from "../../../enums/error-message.enum";

export class GetOneMaintenanceStockPart {
    private maintenanceStockPartModel: MaintenanceStockPartModel = new MaintenanceStockPartModel();

    public handler: Route["handler"] = async (
        request: Request,
        response: Response
    ) => {
        try {
            const maintenanceStockPart = await this.maintenanceStockPartModel.findById(request.params.id);

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
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };
}
