import { DataTypes } from "sequelize";

export const clientSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  drivingLiscence: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

export const clientOptions = {
  timestamps: true,
  freezeTableName: true,
  indexes: [
    {
      unique: true,
      fields: ["email"],
    },
  ],
};