import { model, Model } from "mongoose";
import { DatabaseUser } from "../../../interfaces/user.interface";
import { UserSchema } from "../schema/user.schema";
import { MongooseService } from "../../mongoose/mongoose.service";
export class UserModel {
  private model: Model<User>;
  readonly mongooseService: MongooseService;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("User", UserSchema);
  }

  public async create(user: DatabaseUser): Promise<DatabaseUser> {
    try {
      return this.model.create(user);
    } catch (error) {
      throw error;
    }
  }

  public async findById(userId: string): Promise<DatabaseUser | null> {
    try {
      return this.model.findById(userId).lean();
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string): Promise<DatabaseUser | null> {
    try {
      return this.model.findOne({ email }).lean();
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<DatabaseUser[]> {
    try {
      return this.model.find().lean();
    } catch (error) {
      throw error;
    }
  }

  public async update(
    userId: string,
    user: DatabaseUser
  ): Promise<DatabaseUser | null> {
    try {
      return this.model.findByIdAndUpdate(userId, user, { new: true }).lean();
    } catch (error) {
      throw error;
    }
  }

  public async delete(userId: string): Promise<DatabaseUser | null> {
    try {
      return this.model.findByIdAndDelete(userId).lean();
    } catch (error) {
      throw error;
    }
  }
}
