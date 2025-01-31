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
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email({ message: errorMessage.BAD_EMAIL }),
  password: z.string().regex(REGEX_VALID_PASSWORD),
});
