import { Schema } from "mongoose";
import { DatabaseUser, UserRole } from "../../../interfaces/user.interface";
import { REGEX_VALID_PASSWORD } from "../../../utils/constant";

export const UserSchema = new Schema<DatabaseUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    password: { type: String, required: true, match: REGEX_VALID_PASSWORD },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  }
);
