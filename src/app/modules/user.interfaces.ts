import { Model } from "mongoose";
import { UserModel } from "./user.model";

// Type declarations

/**
 * Type User Address
 */
type Address = {
  street: string;
  city: string;
  country: string;
};

/**
 * Type Order
 */
type Order = {
  productName: string;
  price: number;
  quantity: number;
};

/**
 * Type User
 */
export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders: Order[];
};

export interface UserModel extends Model<User> {
  isUserExist(id: any): Promise<User | null>;
}