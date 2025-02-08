import { Sequelize } from "sequelize";
import { IDatabaseConnection } from "../../types/database.interface";

export class SequelizeService implements IDatabaseConnection<Sequelize, void> {
  private static instance: SequelizeService | undefined;
  public sequelize: Sequelize;

  private constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  public static async get(): Promise<SequelizeService> {
    if (this.instance !== undefined) {
      return this.instance;
    }

    try {
      const connection = await this.connect();
      this.instance = new SequelizeService(connection);
      return this.instance;
    } catch (error) {
      console.error("Erreur lors de l'obtention de l'instance SequelizeService:", error);
      throw error;
    }
  }

  public static async connect(): Promise<Sequelize> {
    try {
      const bbdEndpoint = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.DATABASE_NAME}`;

      const sequelize = new Sequelize(
        bbdEndpoint,
        {
          logging: true,
        }
      );

      await sequelize.authenticate();
      return sequelize;
    } catch (error) {
      console.error("Erreur lors de la connexion SQL:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("Déconnexion SQL réussie.");
    } catch (error) {
      console.error("Erreur lors de la déconnexion SQL:", error);
      throw error;
    }
  }
}
