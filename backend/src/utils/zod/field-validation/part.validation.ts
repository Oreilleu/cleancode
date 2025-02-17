import {
  partErrorMessage,
  scooterErrorMessage,
} from "../../../enums/error-message.enum";
import { z } from "zod";

export const scooterModelValidation = z
  .string({
    required_error: scooterErrorMessage.EMPTY_SCOOTER_MODEL,
    invalid_type_error: scooterErrorMessage.INVALID_TYPE_SCOOTER_MODEL,
  })
  .nonempty({ message: scooterErrorMessage.EMPTY_SCOOTER_MODEL });

export const partNameValidation = z
  .string({
    required_error: partErrorMessage.EMPTY_PART_NAME,
    invalid_type_error: partErrorMessage.INVALID_TYPE_PART_NAME,
  })
  .nonempty({ message: partErrorMessage.EMPTY_PART_NAME });

export const quantityValidation = z
  .number({
    required_error: partErrorMessage.EMPTY_QUANTITY,
    invalid_type_error: partErrorMessage.INVALID_TYPE_QUANTITY,
  })
  .int()
  .positive({ message: partErrorMessage.NEGATIVE_QUANTITY });

export const thresholdValidation = z
  .number({
    required_error: partErrorMessage.EMPTY_THRESHOLD,
    invalid_type_error: partErrorMessage.INVALID_TYPE_THRESHOLD,
  })
  .int()
  .positive({ message: partErrorMessage.NEGATIVE_THRESHOLD });
