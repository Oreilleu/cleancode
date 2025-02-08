import { UserRole } from "../enums/user-role.enum";

export interface DatabaseUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserDTO = Omit<DatabaseUser, "password">;
