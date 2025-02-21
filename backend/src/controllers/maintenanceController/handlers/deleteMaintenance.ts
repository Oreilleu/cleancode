import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { Route } from "../../../interfaces/route.interface";
import { MaintenanceModel } from "../../../services/sequelize/models/maintenance.model";
import { MaintenanceStockPartModel } from "../../../services/sequelize/models/maintenanceStockPart.model";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import {
    maintenanceErrorMessage,
    sequelizeErrorMessage,
} from "../../../enums/error-message.enum";

export class DeleteMaintenance {
    private maintenanceModel: MaintenanceModel = new MaintenanceModel();
    private maintenanceStockPartModel: MaintenanceStockPartModel = new MaintenanceStockPartModel();

    public handler: Route["handler"] = async (
        request: Request,
        response: Response
    ) => {
        try {
            const maintenance = await this.maintenanceModel.findById(request.params.id);

            if (!maintenance) {
                response
                    .status(httpStatusCode.NOT_FOUND)
                    .json({ message: maintenanceErrorMessage.MAINTENANCE_NOT_FOUND });
                return;
            }

            await this.maintenanceStockPartModel.deleteByMaintenanceId(request.params.id);

            await this.maintenanceModel.delete(request.params.id);

            response.status(httpStatusCode.OK).end();
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
