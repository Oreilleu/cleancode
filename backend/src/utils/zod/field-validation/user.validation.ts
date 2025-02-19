import { userErrorMessage } from "../../../enums/error-message.enum";
import { REGEX_VALID_PASSWORD } from "../../../utils/constant";
import { z } from "zod";

export const emailValidation = z
  .string({
    required_error: userErrorMessage.EMPTY_EMAIL,
    invalid_type_error: userErrorMessage.INVALID_TYPE_EMAIL,
  })
  .email({ message: userErrorMessage.BAD_EMAIL })
  .nonempty({ message: userErrorMessage.EMPTY_EMAIL });

export const passwordValidation = z
  .string({
    required_error: userErrorMessage.EMPTY_PASSWORD,
    invalid_type_error: userErrorMessage.INVALID_TYPE_PASSWORD,
  })
  .regex(REGEX_VALID_PASSWORD, { message: userErrorMessage.UNSECURED_PASSWORD })
  .nonempty({ message: userErrorMessage.EMPTY_PASSWORD });

export const firstNameValidation = z
  .string({
    required_error: userErrorMessage.EMPTY_FIRSTNAME,
    invalid_type_error: userErrorMessage.INVALID_TYPE_FIRSTNAME,
  })
  .max(255)
  .nonempty({ message: userErrorMessage.EMPTY_FIRSTNAME });

export const lastNameValidation = z
  .string({
    required_error: userErrorMessage.EMPTY_LASTNAME,
    invalid_type_error: userErrorMessage.INVALID_TYPE_PASSWORD,
  })
  .max(255)
  .nonempty({ message: userErrorMessage.EMPTY_LASTNAME });
