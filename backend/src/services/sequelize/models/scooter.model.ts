import {
  ScooterBody,
  ScooterDatabase,
} from "../../../interfaces/scooter.interface";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { SequelizeService } from "../sequelize.service";

export class ScooterModel {
  private static model: ModelStatic<Model<any, any>> | null = null;
  private sequelize: Sequelize | null = null;

  constructor() {
    this.init().catch((error) => {
      console.error("Failed to initialize ScooterModel:", error);
    });
  }

  private async init() {
    try {
      const sequelizeService = await SequelizeService.get();
      this.sequelize = sequelizeService.sequelize;
      this.defineModel();

      if (ScooterModel.model) {
        await ScooterModel.model.sync();
      }
    } catch (error) {
      console.error("Failed to initialize ScooterModel:", error);
    }
  }

  private defineModel() {
    if (this.sequelize && !ScooterModel.model) {
      ScooterModel.model = this.sequelize.define(
        "scooter",
        {
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
        },
        { timestamps: true, freezeTableName: true }
      );
    }
  }

  public async create(scooter: ScooterBody): Promise<Model<ScooterDatabase>> {
    try {
      if (ScooterModel.model) {
        return await ScooterModel.model.create(scooter);
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findById(
    scooterId: string
  ): Promise<Model<ScooterDatabase> | null> {
    try {
      if (ScooterModel.model) {
        return await ScooterModel.model.findByPk(scooterId);
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findByModel(
    scooterModel: string
  ): Promise<Model<ScooterDatabase> | null> {
    try {
      if (ScooterModel.model) {
        return await ScooterModel.model.findOne({
          where: { model: scooterModel },
        });
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Model<ScooterDatabase>[]> {
    try {
      if (ScooterModel.model) {
        return await ScooterModel.model.findAll();
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async edit(
    idScooter: string,
    scooter: Partial<ScooterBody>
  ): Promise<any | null> {
    try {
      if (ScooterModel.model) {
        const [numberOfAffectedRows, [updatedScooter]] =
          await ScooterModel.model.update(scooter, {
            where: { id: idScooter },
            returning: true,
          });
        return updatedScooter;
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async delete(
    scooterId: string
  ): Promise<Model<ScooterDatabase> | null> {
    try {
      if (ScooterModel.model) {
        const scooter = await ScooterModel.model.findByPk(scooterId);

        if (!scooter) return null;

        await scooter.destroy();
        return scooter;
      }
      throw new Error("Scooter model is not defined");
    } catch (error) {
      throw error;
    }
  }
}
