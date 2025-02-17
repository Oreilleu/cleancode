import { ZodErrorsFormatted } from "../../interfaces/zod-validation.interface";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export class ZodHandler {
  public validationBody = async <BodyT, SchemaT extends ZodRawShape>(
    body: BodyT,
    schema: ZodObject<SchemaT>
  ): Promise<ZodErrorsFormatted> => {
    try {
      const unallowedProperties = this.findUnallowedProperties(
        body as Record<string, any>,
        schema
      );

      if (unallowedProperties.length > 0) {
        return this.createUnallowedPropertiesErrors(unallowedProperties);
      }

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

  private getSchemaKeys<SchemaT extends ZodRawShape>(
    schema: ZodObject<SchemaT>
  ): string[] {
    return Object.keys((schema as any)._def.shape());
  }

  private findUnallowedProperties<SchemaT extends ZodRawShape>(
    body: Record<string, any>,
    schema: ZodObject<SchemaT>
  ): string[] {
    const allowedKeys = this.getSchemaKeys(schema);
    return Object.keys(body).filter((key) => !allowedKeys.includes(key));
  }

  private createUnallowedPropertiesErrors(
    unallowedProperties: string[]
  ): ZodErrorsFormatted {
    return unallowedProperties.map((property) => ({
      path: property,
      message: `La propriété '${property}' n'est pas autorisée`,
    }));
  }

  public isValidationFail = (errors: ZodErrorsFormatted): boolean => {
    return errors.length > 0;
  };
}
