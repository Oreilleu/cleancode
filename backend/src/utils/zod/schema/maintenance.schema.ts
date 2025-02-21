import { z } from "zod";
import {
    scooterIdValidation,
    descriptionValidation,
    startDateValidation,
    endDateValidation,
} from "../field-validation/maintenance.validation";

export const zodMaintenanceSchema = z.object({
    scooterId: scooterIdValidation,
    description: descriptionValidation,
    startDate: startDateValidation,
    endDate: endDateValidation,
});

export const zodMaintenanceEditSchema = z.object({
    scooterId: scooterIdValidation.optional(),
    description: descriptionValidation.optional(),
    startDate: startDateValidation.optional(),
    endDate: endDateValidation.optional(),
});
