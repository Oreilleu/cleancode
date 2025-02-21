import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import {
    MaintenanceBody,
    MaintenanceDatabase,
} from "../../../interfaces/maintenance.interface";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceModel } from "../../../services/sequelize/models/maintenance.model";
import { Model } from "sequelize";
import { zodMaintenanceSchema } from "../../../utils/zod/schema/maintenance.schema";
import {
    maintenanceErrorMessage,
    serverErrorMessage,
} from "../../../enums/error-message.enum";

export class CreateMaintenance {
    private zodHandler: ZodHandler = new ZodHandler();
    private maintenanceModel: MaintenanceModel = new MaintenanceModel();

    public handler: Route["handler"] = async (
        request: Request<ParamsDictionary, any, MaintenanceBody>,
        response: Response
    ) => {
        let errors: ZodErrorsFormatted = [];
        let createdMaintenance: Model<MaintenanceDatabase> | null = null;

        try {
            errors = await this.zodHandler.validationBody(
                request.body,
                zodMaintenanceSchema
            );
        } catch (error) {
            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        if (this.zodHandler.isValidationFail(errors)) {
            response
                .status(httpStatusCode.BAD_REQUEST)
                .json({ message: serverErrorMessage.BAD_REQUEST, errors });
            return;
        }

        try {
            createdMaintenance = await this.maintenanceModel.create(request.body);
        } catch (error: any) {
            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        if (!createdMaintenance) {
            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        return response.status(httpStatusCode.CREATED).json({
            maintenance: createdMaintenance,
        });
    };
}
