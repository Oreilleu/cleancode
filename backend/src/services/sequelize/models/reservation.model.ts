import { DataTypes, Model, ModelStatic, Sequelize, Op } from "sequelize";
import { SequelizeService } from "../sequelize.service";
import {
  ReservationBody,
  ReservationDatabase,
} from "../../../interfaces/reservation.interface";
import { clientSchema, clientOptions } from "../schema/client.schema";

export class ReservationModel {
  private static model: ModelStatic<Model<any, any>> | null = null;
  private sequelize: Sequelize | null = null;

  constructor() {
    this.init().catch((error) => {
      console.error("Failed to initialize ReservationModel:", error);
    });
  }

  private async init() {
    try {
      const sequelizeService = await SequelizeService.get();
      this.sequelize = sequelizeService.sequelize;
      this.defineModel();

      if (ReservationModel.model) {
        await ReservationModel.model.sync();
      }
    } catch (error) {
      console.error("Failed to initialize ReservationModel:", error);
    }
  }

  private defineModel() {
    if (this.sequelize && !ReservationModel.model) {
      ReservationModel.model = this.sequelize.define(
        "client",
        clientSchema,
        clientOptions
      );
    }
  }

  public async create(
    client: ReservationBody
  ): Promise<Model<ReservationDatabase>> {
    try {
      if (ReservationModel.model) {
        return await ReservationModel.model.create(client);
      }

      throw new Error("Reservation model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Model<ReservationDatabase>[]> {
    try {
      if (ReservationModel.model) {
        return await ReservationModel.model.findAll();
      }

      throw new Error("Reservation model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async findById(
    partId: string
  ): Promise<Model<ReservationDatabase> | null> {
    try {
      if (ReservationModel.model) {
        return await ReservationModel.model.findByPk(partId);
      }

      throw new Error("Reservation model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async checkReservationExist(
    client: ReservationBody
  ): Promise<Model<ReservationDatabase> | null> {
    try {
      if (ReservationModel.model) {
        return await ReservationModel.model.findOne({
          where: {
            clientId: client.clientId,
            scooterId: client.scooterId,
            startTime: client.startTime,
            endTime: client.endTime,
          },
        });
      }

      throw new Error("Reservation model is not defined");
    } catch (error) {
      throw error;
    }
  }

  public async checkTimeSlotAvailability(
    client: ReservationBody
  ): Promise<Model<ReservationDatabase> | null> {
    try {
      if (ReservationModel.model) {
        return await ReservationModel.model.findOne({
          where: {
            scooterId: client.scooterId,
            startTime: {
              [Op.lte]: client.startTime,
            },
            endTime: {
              [Op.gte]: client.endTime,
            },
          },
        });
      }

      throw new Error("Reservation model is not defined");
    } catch (error) {
      throw error;
    }
  }
}
