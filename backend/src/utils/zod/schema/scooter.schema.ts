import { z } from "zod";
import {
  isAvailableValidation,
  maintenanceGapMonthValidation,
  maintenanceUsageDayValidation,
  modelValidation,
} from "../field-validation/scooter.validation";

export const zodScooterSchema = z.object({
  model: modelValidation,
  maintenanceGapMonth: maintenanceGapMonthValidation,
  maintenanceUsageDay: maintenanceUsageDayValidation,
  isAvailable: isAvailableValidation,
});

export const zodScooterEditSchema = z.object({
  model: modelValidation.optional(),
  maintenanceGapMonth: maintenanceGapMonthValidation.optional(),
  maintenanceUsageDay: maintenanceUsageDayValidation.optional(),
  isAvailable: isAvailableValidation.optional(),
});
