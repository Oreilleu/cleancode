import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceModel } from "../../../services/sequelize/models/maintenance.model";
import { Route } from "../../../interfaces/route.interface";

export class GetAllMaintenance {
    private maintenanceModel: MaintenanceModel = new MaintenanceModel();

    public handler: Route["handler"] = async (
        request: Request,
        response: Response
    ) => {
        try {
            const maintenances = await this.maintenanceModel.findAll();

            response.status(httpStatusCode.OK).json({ maintenances });
        } catch (error) {
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };
}
