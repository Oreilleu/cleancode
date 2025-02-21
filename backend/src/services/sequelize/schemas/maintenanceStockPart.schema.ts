import { DataTypes } from "sequelize";

export const maintenanceStockPartSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPart: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    idMaintenance: {
        type: DataTypes.UUID,
        allowNull: false,
    },
};

export const maintenanceStockPartOptions = {
    timestamps: true,
    freezeTableName: true,
};
