import { UserRole } from "../enums/user-role.enum";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
}
