import { Optional } from "sequelize";

export interface PartDatabase {
  id: string;
  scooterModel: string;
  partName: string;
  quantity: number;
  threshold: number;
}

export interface PartBody extends Optional<PartDatabase, "id"> {}
