import { z } from "zod";
import {
  partNameValidation,
  quantityValidation,
  scooterModelValidation,
  thresholdValidation,
} from "../field-validation/part.validation";

export const zodPartSchema = z.object({
  scooterModel: scooterModelValidation,
  partName: partNameValidation,
  quantity: quantityValidation,
  threshold: thresholdValidation,
});

export const zodPartEditSchema = z.object({
  scooterModel: scooterModelValidation.optional(),
  partName: partNameValidation.optional(),
  quantity: quantityValidation.optional(),
  threshold: thresholdValidation.optional(),
});
