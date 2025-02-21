import { z } from "zod";
import { maintenanceErrorMessage } from "../../../enums/error-message.enum";

export const scooterIdValidation = z
    .string({
        required_error: maintenanceErrorMessage.EMPTY_SCOOTER_ID,
        invalid_type_error: maintenanceErrorMessage.INVALID_TYPE_SCOOTER_ID,
    })
    .uuid({ message: maintenanceErrorMessage.INVALID_TYPE_SCOOTER_ID });

export const descriptionValidation = z
    .string({
        required_error: maintenanceErrorMessage.EMPTY_DESCRIPTION,
        invalid_type_error: maintenanceErrorMessage.INVALID_TYPE_DESCRIPTION,
    })
    .min(5, { message: "La description doit contenir au moins 5 caractères" })
    .max(255, { message: "La description doit contenir au maximum 255 caractères" });

export const startDateValidation = z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
        message: maintenanceErrorMessage.INVALID_TYPE_START_DATE,
    })
    .transform((val) => new Date(val))
    .nullable();


export const endDateValidation = z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
        message: maintenanceErrorMessage.INVALID_TYPE_END_DATE,
    })
    .transform((val) => new Date(val))
    .nullable();

