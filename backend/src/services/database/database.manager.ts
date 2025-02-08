import { SequelizeService } from "../sequelize/sequelize.service";
import { MongooseService } from "../mongoose/mongoose.service";

export abstract class DatabaseManager {
  static sequelize: SequelizeService | null = null;
  static moongoose: MongooseService | null = null;

  public static async connectPostgreSQL() {
    try {
      this.sequelize = await SequelizeService.get();

      console.log("✅ Connected to PostgreSQL");
    } catch (error) {
      console.error("❌ PostgreSQL Connection Error:", error);
      throw error;
    }
  }

  public static async connectMongoDB() {
    try {
      this.moongoose = await MongooseService.get();
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      throw error;
    }
  }

  public static async connectAll() {
    try {
      await Promise.all([this.connectPostgreSQL(), this.connectMongoDB()]);
      console.log("✅ All databases connected");
    } catch (error) {
      console.error("❌ Error connecting to databases:", error);
    }
  }

  public static async closeConnections() {
    try {
      await Promise.all([
        this.sequelize?.disconnect(),
        this.moongoose?.disconnect(),
      ]);
      console.log("✅ Database connections closed");
    } catch (error) {
      console.error("❌ Error closing database connections:", error);
    }
  }
}
