import { ZodErrorsFormatted } from "../interfaces/zod-validation.interface";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export class ZodHandler {
  public validationBody = async <BodyT, SchemaT extends ZodRawShape>(
    body: BodyT,
    schema: ZodObject<SchemaT>
  ): Promise<ZodErrorsFormatted> => {
    try {
      schema.parse(body);
      return [];
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
      }

      throw error;
    }
  };

  public isValidationFail = (errors: ZodErrorsFormatted): boolean => {
    return errors.length > 0;
  };
}
