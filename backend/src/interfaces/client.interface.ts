import { Optional } from "sequelize";

export interface ClientDatabase {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  drivingLiscence: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientBody
  extends Optional<ClientDatabase, "id" | "createdAt" | "updatedAt"> {}
