import { Request, Response } from "express";
import { Route } from "../../../interfaces/route.interface";
import { MaintenanceStockPartBody, MaintenanceStockPartDatabase } from "../../../interfaces/maintenanceStockPart.interface";
import { ZodHandler } from "../../../utils/zod/zod-handler.class";
import { ParamsDictionary } from "express-serve-static-core";
import { ZodErrorsFormatted } from "../../../interfaces/zod-validation.interface";
import { httpStatusCode } from "../../../enums/http-status-code.enum";
import { MaintenanceStockPartModel } from "../../../services/sequelize/models/maintenanceStockPart.model";
import { Model } from "sequelize";
import { zodMaintenanceStockPartSchema } from "../../../utils/zod/schema/maintenanceStockPart.schema";
import {
    maintenanceStockPartErrorMessage,
    serverErrorMessage,
} from "../../../enums/error-message.enum";

export class CreateMaintenanceStockPart {
    private zodHandler: ZodHandler = new ZodHandler();
    private maintenanceStockPartModel: MaintenanceStockPartModel = new MaintenanceStockPartModel();

    public handler: Route["handler"] = async (
        request: Request<ParamsDictionary, any, MaintenanceStockPartBody>,
        response: Response
    ) => {
        let errors: ZodErrorsFormatted = [];
        let createdMaintenanceStockPart: Model<MaintenanceStockPartDatabase> | null = null;

        try {
            // Validation du body de la requête avec Zod
            errors = await this.zodHandler.validationBody(
                request.body,
                zodMaintenanceStockPartSchema
            );
        } catch (error) {
            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        // Si la validation échoue, retour d'une erreur
        if (this.zodHandler.isValidationFail(errors)) {
            response
                .status(httpStatusCode.BAD_REQUEST)
                .json({ message: serverErrorMessage.BAD_REQUEST, errors });
            return;
        }

        try {
            // Création de la maintenance stock part dans la base de données
            createdMaintenanceStockPart = await this.maintenanceStockPartModel.create(request.body);
        } catch (error: any) {
            const isUniqueConstraintError =
                error.name === "SequelizeUniqueConstraintError" &&
                error.parent.code === "23505"; // Si une erreur de contrainte unique se produit

            if (isUniqueConstraintError) {
                response
                    .status(httpStatusCode.BAD_REQUEST)
                    .json({ message: maintenanceStockPartErrorMessage.MODEL_UNIQUE });
                return;
            }

            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        // Si l'objet n'a pas été créé correctement, renvoyer une erreur
        if (!createdMaintenanceStockPart) {
            response
                .status(httpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: serverErrorMessage.INTERNAL_SERVER_ERROR });
            return;
        }

        // Renvoi de la réponse avec l'objet créé
        return response.status(httpStatusCode.CREATED).json({
            maintenanceStockPart: createdMaintenanceStockPart,
        });
    };
}
