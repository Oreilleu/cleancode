import { Optional } from "sequelize";

export interface MaintenanceDatabase {
    id: string;
    scooterId: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
}

export interface MaintenanceBody
    extends Optional<MaintenanceDatabase, "id"> {}