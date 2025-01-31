import mongoose, { Connection } from "mongoose";

export class MongooseService {
  public async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error: ", error);
    }
  }
}
