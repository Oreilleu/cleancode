import { z } from "zod";

export const quantityValidation = z
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1" });

export const idPartValidation = z.string().uuid({
    message: "Invalid idPart format",
});

export const idMaintenanceValidation = z.string().uuid({
    message: "Invalid idMaintenance format",
});
