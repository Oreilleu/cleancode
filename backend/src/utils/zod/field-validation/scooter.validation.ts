import { scooterErrorMessage } from "../../../enums/error-message.enum";
import { z } from "zod";

export const modelValidation = z
  .string({
    required_error: scooterErrorMessage.EMPTY_MODEL,
    invalid_type_error: scooterErrorMessage.INVALID_TYPE_MODEL,
  })
  .nonempty({ message: scooterErrorMessage.EMPTY_MODEL });

export const maintenanceGapMonthValidation = z
  .number({
    required_error: scooterErrorMessage.EMPTY_MAINTENANCE_GAP_MONTH,
    invalid_type_error: scooterErrorMessage.INVALID_TYPE_MAINTENANCE_GAP_MONTH,
  })
  .int()
  .positive({ message: scooterErrorMessage.NEGATIVE_MAINTENANCE_GAP_MONTH });

export const maintenanceUsageDayValidation = z
  .number({
    required_error: scooterErrorMessage.EMPTY_MAINTENANCE_USAGE_DAY,
    invalid_type_error: scooterErrorMessage.INVALID_TYPE_MAINTENANCE_USAGE_DAY,
  })
  .int()
  .positive({ message: scooterErrorMessage.NEGATIVE_MAINTENANCE_USAGE_DAY });

export const isAvailableValidation = z.boolean({
  required_error: scooterErrorMessage.EMPTY_IS_AVAILABLE,
  invalid_type_error: scooterErrorMessage.INVALID_TYPE_IS_AVAILABLE,
});
