import { model, Model } from "mongoose";
import { User } from "../../../interfaces/user.interface";
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

  public async create(user: User): Promise<User> {
    return this.model.create(user);
  }

  public async findById(userId: string): Promise<User | null> {
    return this.model.findById(userId).lean();
  }

  public async findAll(): Promise<User[]> {
    return this.model.find().lean();
  }

  public async update(userId: string, user: User): Promise<User | null> {
    return this.model.findByIdAndUpdate(userId, user, { new: true }).lean();
  }

  public async delete(userId: string): Promise<User | null> {
    return this.model.findByIdAndDelete(userId).lean();
  }
}
