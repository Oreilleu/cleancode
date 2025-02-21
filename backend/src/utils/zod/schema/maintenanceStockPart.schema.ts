import { z } from "zod";
import { maintenanceStockPartErrorMessage } from "../../../enums/error-message.enum";

export const quantityValidation = z
    .number({
        required_error: maintenanceStockPartErrorMessage.EMPTY_QUANTITY,
        invalid_type_error: maintenanceStockPartErrorMessage.INVALID_TYPE_QUANTITY,
    })
    .positive({ message: maintenanceStockPartErrorMessage.NEGATIVE_QUANTITY });

export const idPartValidation = z
    .string({
        required_error: maintenanceStockPartErrorMessage.EMPTY_ID_PART,
        invalid_type_error: maintenanceStockPartErrorMessage.INVALID_TYPE_ID_PART,
    })
    .uuid({ message: maintenanceStockPartErrorMessage.INVALID_UUID });

export const idMaintenanceValidation = z
    .string({
        required_error: maintenanceStockPartErrorMessage.EMPTY_ID_MAINTENANCE,
        invalid_type_error: maintenanceStockPartErrorMessage.INVALID_TYPE_ID_MAINTENANCE,
    })
    .uuid({ message: maintenanceStockPartErrorMessage.INVALID_UUID });

export const zodMaintenanceStockPartSchema = z.object({
    quantity: quantityValidation,
    idPart: idPartValidation,
    idMaintenance: idMaintenanceValidation,
});

export const zodMaintenanceStockPartEditSchema = z.object({
    quantity: quantityValidation.optional(),
    idPart: idPartValidation.optional(),
    idMaintenance: idMaintenanceValidation.optional(),
});
