import express, { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userService.createUserIntoDb(user);

    // const { password , ...resultWithoutPassword} = result;

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDb();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserFromDb(Number(userId));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUserFromDb(Number(userId));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;

    const result = await userService.updateUserIntoDb(user, Number(userId));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;

    const result = await userService.addOrderIntoDb(user, Number(userId));

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getOrderFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getOrderTotalFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const UserController = {
  createUser,
  getUser,
  getOneUser,
  deleteUser,
  updateUser,
  addOrder,
  getOrder,
  getOrderPrice,
};
