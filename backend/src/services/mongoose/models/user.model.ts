import { model, Model } from "mongoose";
import { DatabaseUser } from "../../../interfaces/user.interface";
import { UserSchema } from "../schema/user.schema";

export class UserModel {
  private model: Model<DatabaseUser>;

  constructor() {
    this.model = model<DatabaseUser>("User", UserSchema);
  }

  public async create(user: DatabaseUser): Promise<DatabaseUser> {
    return this.model.create(user);
  }

  public async findById(userId: string): Promise<DatabaseUser | null> {
    return this.model.findById(userId).lean();
  }

  public async findOne(email: string): Promise<DatabaseUser | null> {
    return this.model.findOne({ email }).lean();
  }

  public async findAll(): Promise<DatabaseUser[]> {
    return this.model.find().lean();
  }

  public async update(
    userId: string,
    user: DatabaseUser
  ): Promise<DatabaseUser | null> {
    return this.model.findByIdAndUpdate(userId, user, { new: true }).lean();
  }

  public async delete(userId: string): Promise<DatabaseUser | null> {
    return this.model.findByIdAndDelete(userId).lean();
  }
}
