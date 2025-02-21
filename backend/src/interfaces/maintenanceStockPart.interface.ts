import { Optional } from "sequelize";

export interface MaintenanceStockPartDatabase {
    id: string;
    quantity: number;
    idPart: string;
    idMaintenance: string;
}

export interface MaintenanceStockPartBody
    extends Optional<MaintenanceStockPartDatabase, "id"> {}
