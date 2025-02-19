import { DataTypes } from "sequelize";

export const partSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  scooterModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  threshold: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    allowNull: false,
  },
};

export const partOptions = {
  timestamps: true,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ["scooterModel", "partName"],
    },
  ],
};
