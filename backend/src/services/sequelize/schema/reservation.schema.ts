import { DataTypes } from "sequelize";

export const reservationSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Client', 
            key: 'id',
        },
    },
    scooterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Scooter', 
            key: 'id',
        },
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnedMiles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    returnedBatteryRotation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    returnedComments: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
};

export const reservationOptions = {
  timestamps: true,
  freezeTableName: true,
};