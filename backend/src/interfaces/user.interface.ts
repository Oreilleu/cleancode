export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface DatabaseUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserDTO = Omit<DatabaseUser, "password">;
