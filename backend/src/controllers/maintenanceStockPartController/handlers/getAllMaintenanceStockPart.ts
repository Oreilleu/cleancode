import { Request, Response } from "express";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceStockPartModel } from "../../../services/sequelize/models/maintenanceStockPart.model";
import { Route } from "../../../interfaces/route.interface";

export class GetAllMaintenanceStockPart {
    private maintenanceStockPartModel: MaintenanceStockPartModel = new MaintenanceStockPartModel();

    public handler: Route["handler"] = async (
        request: Request,
        response: Response
    ) => {
        try {
            const maintenanceStockParts = await this.maintenanceStockPartModel.findAll();

            response.status(httpStatusCode.OK).json({ maintenanceStockParts });
        } catch (error) {
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };
}
