import { UserModel } from "./user.model";
import { User } from './user.interfaces'

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);

  return {
    userId: result.userId,
    username: result.username,
    fullName: result.fullName,
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: result.address,
  };
};

const getUsersFromDb = async () => {
  const result = await UserModel.find().select("-_id username fullName age email address");

  return result;
};

const getUserFromDb = async (userId: number) => {
  if (await UserModel.isUserExist(Number(userId))) {
    const result = await UserModel.findOne({ userId }).select("-_id username fullName age email address");
    return {
      success: true,
      message: "Users fetched successfully!",
      data: result,
    };
  } else {
    return {
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    };
  }
};

const deleteUserFromDb = async (userId: number) => {
  if (await UserModel.isUserExist(Number(userId))) {
    const result = await UserModel.deleteOne({ userId });
    return {
      success: true,
      message: "User deleted successfully!",
      data: null,
    };
  } else {
    return {
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    };
  }
};

const updateUserIntoDb = async (user: User, userId: number) => {
  if (await UserModel.isUserExist(Number(userId))) {
    const result = await UserModel.updateOne(
      { userId },
      {
        $set: user,
      }
    );

    const newUser = await UserModel.findOne({ userId }).select("-_id username fullName age email address");
    return {
      success: true,
      message: "User updated successfully!",
      data: newUser,
    };
  } else {
    return {
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    };
  }
};

const addOrderIntoDb = async (order: any, userId: number) => {
  const user = await UserModel.findOne({ userId });

  if (user) {
    const result = await UserModel.updateOne(
      { userId },
      {
        $push: {
          orders: order,
        },
      }
    );

    return result;
  } else return {};
};

const getOrderFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select("-_id orders");

  return result;
};

const getOrderTotalFromDb = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select("-_id orders");
  let sum = 0;
  if (result?.orders) {
    result?.orders?.forEach((el) => {
      sum = sum + el.quantity * el.price;
    });
  }

  return sum;
};

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
  getUserFromDb,
  deleteUserFromDb,
  updateUserIntoDb,
  addOrderIntoDb,
  getOrderFromDb,
  getOrderTotalFromDb,
};
