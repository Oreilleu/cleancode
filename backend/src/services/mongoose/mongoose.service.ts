import mongoose, { Connection } from "mongoose";

export class MongooseService {
  private database: Connection | undefined = undefined;

  public async connectDatabase(): Promise<void> {
    try {
      const mongooseInstance = await mongoose.connect(
        process.env.MONGODB_URI || ""
      );
      this.database = mongooseInstance.connection;
      console.log("Database connected");
    } catch (error) {
      this.database = undefined;
      console.error("Database connection error: ", error);
    }
  }

  public getDatabase(): mongoose.Connection | undefined {
    return this.database;
  }
}
