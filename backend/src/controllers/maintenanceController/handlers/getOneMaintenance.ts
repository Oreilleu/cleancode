import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceModel } from "../../../services/sequelize/models/maintenance.model";
import { Route } from "../../../interfaces/route.interface";
import { isUuidUnvalidError } from "../../../utils/sequelize-uuid-unvalid-error";
import {
    maintenanceErrorMessage,
    sequelizeErrorMessage,
} from "../../../enums/error-message.enum";

export class GetOneMaintenance {
    private maintenanceModel: MaintenanceModel = new MaintenanceModel();

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

            response.status(httpStatusCode.OK).json(maintenance);
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
