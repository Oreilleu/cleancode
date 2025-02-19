import { z } from "zod";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "../field-validation/user.validation";

export const createClientSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  drivingLiscence: z.boolean().default(false),
});
