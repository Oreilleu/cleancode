import { Optional } from "sequelize";

export interface ReservationDatabase {
  id: string;
  clientId: string;
  scooterId: string;
  startTime: Date;
  endTime: Date;
  returnedMiles: string;
  returnedBatteryRotation: number;
  returnedComments?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationBody
  extends Optional<ReservationDatabase, "id" | "createdAt" | "updatedAt"> {}
