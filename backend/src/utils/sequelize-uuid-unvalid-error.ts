import { DatabaseError } from "sequelize";

interface PostgresError extends Error {
  code: string;
}
export const isUuidUnvalidError = (error: unknown): boolean => {
  if (!(error instanceof DatabaseError)) return false;

  return (
    error.name === "SequelizeDatabaseError" &&
    (error.parent as PostgresError).code === "22P02"
  );
};
