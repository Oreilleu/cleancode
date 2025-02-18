import { DataTypes } from "sequelize";

export const scooterSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  maintenanceGapMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maintenanceUsageDay: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export const scooterOptions = {
  timestamps: true,
  freezeTableName: true,
};
