import { IDatabaseConnection } from "../../types/database.interface";
import { UserModel } from "./models/user.model";
import mongoose, { Mongoose } from "mongoose";
export class MongooseService implements IDatabaseConnection<Mongoose, void> {
  private static instance: MongooseService | undefined;
  public userService: UserModel;
  public mongoose: Mongoose;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.userService = new UserModel(this);
  }

  public static async get(): Promise<MongooseService> {
    if (this.instance !== undefined) {
      return this.instance;
    }
    
    try {
      const connection = await this.connect();
      this.instance = new MongooseService(connection);
      return this.instance;
    } catch (error) {
      console.error("Erreur lors de l'obtention de l'instance MongooseService:", error);
      throw error;
    }
  }

  public static async connect(): Promise<Mongoose> {
    try {
      const connection = await mongoose.connect(
        process.env.MONGO_DB_URI || "",
        {
          auth: {
            username: process.env.MONGO_DB_USERNAME,
            password: process.env.MONGO_DB_PASSWORD,
          },
          authSource: "admin",
          dbName: process.env.DATABASE_NAME,
        }
      );

      if (!connection) {
        throw new Error("Failed to connect to MongoDB");
      }

      return connection;
    } catch (error) {
      console.error("Erreur lors de la connexion MongoDB:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("Déconnexion MongoDB réussie.");
    } catch (error) {
      console.error("Erreur lors de la déconnexion MongoDB:", error);
      throw error;
    }
  }
}
