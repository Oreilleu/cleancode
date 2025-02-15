import { z } from "zod";
import { REGEX_VALID_PASSWORD } from "./constant";
import { errorMessage } from "../enums/error-message.enum";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: errorMessage.EMPTY_EMAIL,
      invalid_type_error: errorMessage.INVALID_TYPE_EMAIL,
    })
    .nonempty({ message: errorMessage.EMPTY_EMAIL }),
  password: z
    .string({
      required_error: errorMessage.EMPTY_PASSWORD,
      invalid_type_error: errorMessage.INVALID_TYPE_PASSWORD,
    })
    .nonempty({ message: errorMessage.EMPTY_PASSWORD }),
});

export const registerSchema = z.object({
  firstName: z
    .string({
      required_error: errorMessage.EMPTY_FIRSTNAME,
      invalid_type_error: errorMessage.INVALID_TYPE_FIRSTNAME,
    })
    .max(255)
    .nonempty({ message: errorMessage.EMPTY_FIRSTNAME }),
  lastName: z
    .string({
      required_error: errorMessage.EMPTY_LASTNAME,
      invalid_type_error: errorMessage.INVALID_TYPE_PASSWORD,
    })
    .max(255)
    .nonempty({ message: errorMessage.EMPTY_LASTNAME }),
  email: z
    .string({
      required_error: errorMessage.EMPTY_EMAIL,
      invalid_type_error: errorMessage.INVALID_TYPE_EMAIL,
    })
    .email({ message: errorMessage.BAD_EMAIL })
    .nonempty({ message: errorMessage.EMPTY_EMAIL }),
  password: z
    .string({
      required_error: errorMessage.EMPTY_PASSWORD,
      invalid_type_error: errorMessage.INVALID_TYPE_PASSWORD,
    })
    .regex(REGEX_VALID_PASSWORD, { message: errorMessage.UNSECURED_PASSWORD })
    .nonempty({ message: errorMessage.EMPTY_PASSWORD }),
});

export const scooterSchema = z.object({
  model: z
    .string({
      required_error: errorMessage.EMPTY_MODEL,
      invalid_type_error: errorMessage.INVALID_TYPE_MODEL,
    })
    .nonempty({ message: errorMessage.EMPTY_MODEL }),
  maintenanceGapMonth: z
    .number({
      required_error: errorMessage.EMPTY_MAINTENANCE_GAP_MONTH,
      invalid_type_error: errorMessage.INVALID_TYPE_MAINTENANCE_GAP_MONTH,
    })
    .int()
    .positive({ message: errorMessage.NEGATIVE_MAINTENANCE_GAP_MONTH }),
  maintenanceUsageDay: z
    .number({
      required_error: errorMessage.EMPTY_MAINTENANCE_USAGE_DAY,
      invalid_type_error: errorMessage.INVALID_TYPE_MAINTENANCE_USAGE_DAY,
    })
    .int()
    .positive({ message: errorMessage.NEGATIVE_MAINTENANCE_USAGE_DAY }),
  isAvailable: z.boolean({
    required_error: errorMessage.EMPTY_IS_AVAILABLE,
    invalid_type_error: errorMessage.INVALID_TYPE_IS_AVAILABLE,
  }),
});

export const scooterEditSchema = z.object({
  model: z.string().optional(),
  maintenanceGapMonth: z.number().int().positive().optional(),
  maintenanceUsageDay: z.number().int().positive().optional(),
  isAvailable: z.boolean().optional(),
});
