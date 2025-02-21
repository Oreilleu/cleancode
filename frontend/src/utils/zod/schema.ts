import { z } from "zod";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
} from "./field-validation";

export const zodLoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const zodRegisterSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  password: passwordValidation,
});
