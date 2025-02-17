import { Model, ModelStatic, Sequelize } from "sequelize";
import { SequelizeService } from "../sequelize.service";
import { PartBody, PartDatabase } from "../../../interfaces/part.interface";
import { ScooterModel } from "./scooter.model";
import { partOptions, partSchema } from "../schemas/part.schema";

export class PartModel {
  private static model: ModelStatic<Model<any, any>> | null = null;
  private scooterModel: ScooterModel = new ScooterModel();
  private sequelize: Sequelize | null = null;

  constructor() {
    this.init().catch((error) => {
      console.error("Failed to initialize PartModel:", error);
    });
  }

  private async init() {
    try {
      const sequelizeService = await SequelizeService.get();
      this.sequelize = sequelizeService.sequelize;
      this.defineModel();

      if (PartModel.model) {
        await PartModel.model.sync();
      }
    } catch (error) {
      console.error("Failed to initialize PartModel:", error);
    }
  }

  private defineModel() {
    if (this.sequelize && !PartModel.model) {
      PartModel.model = this.sequelize.define("part", partSchema, partOptions);
    }
  }

  public async create(part: PartBody): Promise<Model<PartDatabase>> {
    try {
      if (PartModel.model) {
        return await PartModel.model.create(part);
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findById(partId: string): Promise<Model<PartDatabase> | null> {
    try {
      if (PartModel.model) {
        return await PartModel.model.findByPk(partId);
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findByScooterModel(
    scooterModel: string
  ): Promise<Model<PartDatabase>[] | null> {
    try {
      if (PartModel.model) {
        const scooter = await this.scooterModel.findByModel(scooterModel);

        if (!scooter) return null;

        return await PartModel.model.findAll({
          where: { scooterModel },
        });
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findByModelAndPartName(
    scooterModel: string,
    partName: string
  ): Promise<Model<PartDatabase> | null> {
    try {
      if (PartModel.model) {
        return await PartModel.model.findOne({
          where: { scooterModel, partName },
        });
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Model<PartDatabase>[]> {
    try {
      if (PartModel.model) {
        return await PartModel.model.findAll();
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async edit(
    partId: string,
    part: Partial<PartBody>
  ): Promise<any | null> {
    try {
      if (PartModel.model) {
        const [numberOfAffectedRows, [updatedPart]] =
          await PartModel.model.update(part, {
            where: { id: partId },
            returning: true,
          });
        return updatedPart;
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async delete(partId: string): Promise<Model<PartDatabase> | null> {
    try {
      if (PartModel.model) {
        const part = await PartModel.model.findByPk(partId);

        if (!part) return null;

        await part.destroy();
        return part;
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async deleteByScooterModel(
    scooterModel: string
  ): Promise<Model<PartDatabase>[] | null> {
    try {
      if (PartModel.model) {
        const scooter = await this.scooterModel.findByModel(scooterModel);

        if (!scooter) return null;

        const parts = await PartModel.model.findAll({
          where: { scooterModel },
        });

        if (!parts) return [];

        await PartModel.model.destroy({ where: { scooterModel } });
        return parts;
      }
      throw new Error("Part model is not defined");
    } catch (error) {
      throw error;
    }
  }
}
