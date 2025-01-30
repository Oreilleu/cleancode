export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
}
