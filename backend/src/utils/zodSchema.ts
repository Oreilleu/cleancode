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

export const createClientSchema = z.object({
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
      invalid_type_error: errorMessage.INVALID_TYPE_LASTNAME,
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
  drivingLiscence: z.boolean().default(false),
});
