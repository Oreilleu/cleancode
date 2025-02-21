import {
    MaintenanceBody,
    MaintenanceDatabase,
} from "../../../interfaces/maintenance.interface";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { SequelizeService } from "../sequelize.service";
import { maintenanceOptions, maintenanceSchema } from "../schemas/maintenance.schema";

export class MaintenanceModel {
    private static model: ModelStatic<Model<any, any>> | null = null;
    private sequelize: Sequelize | null = null;

    constructor() {
        this.init().catch((error) => {
            console.error("Failed to initialize MaintenanceModel:", error);
        });
    }

    private async init() {
        try {
            const sequelizeService = await SequelizeService.get();
            this.sequelize = sequelizeService.sequelize;
            this.defineModel();

            if (MaintenanceModel.model) {
                await MaintenanceModel.model.sync();
            }
        } catch (error) {
            console.error("Failed to initialize MaintenanceModel:", error);
        }
    }

    private defineModel() {
        if (this.sequelize && !MaintenanceModel.model) {
            MaintenanceModel.model = this.sequelize.define(
                "maintenance",
                maintenanceSchema,
                maintenanceOptions
            );
        }
    }

    public async create(maintenance: MaintenanceBody): Promise<Model<MaintenanceDatabase>> {
        try {
            if (MaintenanceModel.model) {
                return await MaintenanceModel.model.create(maintenance);
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findById(
        maintenanceId: string
    ): Promise<Model<MaintenanceDatabase> | null> {
        try {
            if (MaintenanceModel.model) {
                return await MaintenanceModel.model.findByPk(maintenanceId);
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findByScooterId(
        scooterId: string
    ): Promise<Model<MaintenanceDatabase>[]> {
        try {
            if (MaintenanceModel.model) {
                return await MaintenanceModel.model.findAll({
                    where: { scooterId },
                });
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<Model<MaintenanceDatabase>[]> {
        try {
            if (MaintenanceModel.model) {
                return await MaintenanceModel.model.findAll();
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async edit(
        maintenanceId: string,
        maintenance: Partial<MaintenanceBody>
    ): Promise<any | null> {
        try {
            if (MaintenanceModel.model) {
                const [numberOfAffectedRows, [updatedMaintenance]] =
                    await MaintenanceModel.model.update(maintenance, {
                        where: { id: maintenanceId },
                        returning: true,
                    });
                return updatedMaintenance;
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }

    public async delete(
        maintenanceId: string
    ): Promise<Model<MaintenanceDatabase> | null> {
        try {
            if (MaintenanceModel.model) {
                const maintenance = await MaintenanceModel.model.findByPk(maintenanceId);

                if (!maintenance) return null;

                await maintenance.destroy();
                return maintenance;
            }
            throw new Error("Maintenance model is not defined");
        } catch (error) {
            throw error;
        }
    }
}
