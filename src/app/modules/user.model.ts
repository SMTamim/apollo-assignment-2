import { Schema, model, connect } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";
import { UserModel as UserInterfaceModel, User } from "./user.interfaces";


const userSchema = new Schema<User, UserInterfaceModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

userSchema.statics.isUserExist = async function (userId: string): Promise<User | null> {
  const existingUser = await this.findOne({ userId });
  return existingUser;
};

userSchema.pre("save", async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

  next();
});

userSchema.post("save", function () {});

export const UserModel = model<User, UserInterfaceModel>("User", userSchema);
