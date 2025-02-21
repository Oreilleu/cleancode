import {
    MaintenanceStockPartBody,
    MaintenanceStockPartDatabase,
} from "../../../interfaces/maintenanceStockPart.interface";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { SequelizeService } from "../sequelize.service";
import { maintenanceStockPartOptions, maintenanceStockPartSchema } from "../schemas/maintenanceStockPart.schema";

export class MaintenanceStockPartModel {
    private static model: ModelStatic<Model<any, any>> | null = null;
    private sequelize: Sequelize | null = null;

    constructor() {
        this.init().catch((error) => {
            console.error("Failed to initialize MaintenanceStockPartModel:", error);
        });
    }

    private async init() {
        try {
            const sequelizeService = await SequelizeService.get();
            this.sequelize = sequelizeService.sequelize;
            this.defineModel();

            if (MaintenanceStockPartModel.model) {
                await MaintenanceStockPartModel.model.sync();
            }
        } catch (error) {
            console.error("Failed to initialize MaintenanceStockPartModel:", error);
        }
    }

    private defineModel() {
        if (this.sequelize && !MaintenanceStockPartModel.model) {
            MaintenanceStockPartModel.model = this.sequelize.define(
                "maintenanceStockPart",
                maintenanceStockPartSchema,
                maintenanceStockPartOptions
            );
        }
    }

    public async create(
        maintenanceStockPart: MaintenanceStockPartBody
    ): Promise<Model<MaintenanceStockPartDatabase>> {
        try {
            if (MaintenanceStockPartModel.model) {
                return await MaintenanceStockPartModel.model.create(maintenanceStockPart);
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findById(
        maintenanceStockPartId: string
    ): Promise<Model<MaintenanceStockPartDatabase> | null> {
        try {
            if (MaintenanceStockPartModel.model) {
                return await MaintenanceStockPartModel.model.findByPk(maintenanceStockPartId);
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findByMaintenanceId(
        maintenanceId: string
    ): Promise<Model<MaintenanceStockPartDatabase>[]> {
        try {
            if (MaintenanceStockPartModel.model) {
                return await MaintenanceStockPartModel.model.findAll({
                    where: { idMaintenance: maintenanceId },
                });
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<Model<MaintenanceStockPartDatabase>[]> {
        try {
            if (MaintenanceStockPartModel.model) {
                return await MaintenanceStockPartModel.model.findAll();
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async edit(
        maintenanceStockPartId: string,
        maintenanceStockPart: Partial<MaintenanceStockPartBody>
    ): Promise<any | null> {
        try {
            if (MaintenanceStockPartModel.model) {
                const [numberOfAffectedRows, [updatedMaintenanceStockPart]] =
                    await MaintenanceStockPartModel.model.update(maintenanceStockPart, {
                        where: { id: maintenanceStockPartId },
                        returning: true,
                    });
                return updatedMaintenanceStockPart;
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async delete(
        maintenanceStockPartId: string
    ): Promise<Model<MaintenanceStockPartDatabase> | null> {
        try {
            if (MaintenanceStockPartModel.model) {
                const maintenanceStockPart = await MaintenanceStockPartModel.model.findByPk(maintenanceStockPartId);

                if (!maintenanceStockPart) return null;

                await maintenanceStockPart.destroy();
                return maintenanceStockPart;
            }
            throw new Error("MaintenanceStockPart model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async deleteByMaintenanceId(
        maintenanceId: string
    ): Promise<void> {
        try {
            if (MaintenanceStockPartModel.model) {
                const maintenanceStockParts = await MaintenanceStockPartModel.model.findAll({
                    where: { idMaintenance: maintenanceId },
                });

                for (const part of maintenanceStockParts) {
                    await part.destroy();
                }
            } else {
                throw new Error("MaintenanceStockPart model is not defined");
            }
        } catch (error) {
            throw error;
        }
    }
}
