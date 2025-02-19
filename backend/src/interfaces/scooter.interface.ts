import { Optional } from "sequelize";

export interface ScooterDatabase {
  id: string;
  model: string;
  maintenanceGapMonth: string;
  maintenanceUsageDay: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScooterBody
  extends Optional<ScooterDatabase, "id" | "createdAt" | "updatedAt"> {}
