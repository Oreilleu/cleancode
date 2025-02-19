import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { SequelizeService } from "../sequelize.service";
import {
  ClientBody,
  ClientDatabase,
} from "../../../interfaces/client.interface";
import { clientSchema, clientOptions } from "../schema/client.schema";

export class ClientModel {
  private static model: ModelStatic<Model<any, any>> | null = null;
  private sequelize: Sequelize | null = null;

  constructor() {
    this.init().catch((error) => {
      console.error("Failed to initialize ClientModel:", error);
    });
  }

  private async init() {
    try {
      const sequelizeService = await SequelizeService.get();
      this.sequelize = sequelizeService.sequelize;
      this.defineModel();

      if (ClientModel.model) {
        await ClientModel.model.sync();
      }
    } catch (error) {
      console.error("Failed to initialize ClientModel:", error);
    }
  }

  private defineModel() {
    if (this.sequelize && !ClientModel.model) {
      ClientModel.model = this.sequelize.define(
        "client",
        clientSchema,
        clientOptions
      );
    }
  }

  public async create(client: ClientBody): Promise<Model<ClientDatabase>> {
    try {
      if (ClientModel.model) {
        return await ClientModel.model.create(client);
      }

      throw new Error("Client model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Model<ClientDatabase>[]> {
    try {
      if (ClientModel.model) {
        return await ClientModel.model.findAll();
      }

      throw new Error("Client model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findById(partId: string): Promise<Model<ClientDatabase> | null> {
    try {
      if (ClientModel.model) {
        return await ClientModel.model.findByPk(partId);
      }

      throw new Error("Client model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(
    email: string
  ): Promise<Model<ClientDatabase> | null> {
    try {
      if (ClientModel.model) {
        return await ClientModel.model.findOne({
          where: {
            email,
          },
        });
      }

      throw new Error("Client model is not defined");
    } catch (error) {
      throw error;
    }
  }
}
