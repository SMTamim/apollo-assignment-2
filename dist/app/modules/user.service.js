"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
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
});
const getUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select("-_id username fullName age email address");
    return result;
});
const getUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExist(Number(userId))) {
        const result = yield user_model_1.UserModel.findOne({ userId }).select("-_id username fullName age email address");
        return {
            success: true,
            message: "Users fetched successfully!",
            data: result,
        };
    }
    else {
        return {
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        };
    }
});
const deleteUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExist(Number(userId))) {
        const result = yield user_model_1.UserModel.deleteOne({ userId });
        return {
            success: true,
            message: "User deleted successfully!",
            data: null,
        };
    }
    else {
        return {
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        };
    }
});
const updateUserIntoDb = (user, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.UserModel.isUserExist(Number(userId))) {
        const result = yield user_model_1.UserModel.updateOne({ userId }, {
            $set: user,
        });
        const newUser = yield user_model_1.UserModel.findOne({ userId }).select("-_id username fullName age email address");
        return {
            success: true,
            message: "User updated successfully!",
            data: newUser,
        };
    }
    else {
        return {
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        };
    }
});
const addOrderIntoDb = (order, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId });
    if (user) {
        const result = yield user_model_1.UserModel.updateOne({ userId }, {
            $push: {
                orders: order,
            },
        });
        return result;
    }
    else
        return {};
});
const getOrderFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }).select("-_id orders");
    return result;
});
const getOrderTotalFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_model_1.UserModel.findOne({ userId }).select("-_id orders");
    let sum = 0;
    if (result === null || result === void 0 ? void 0 : result.orders) {
        (_a = result === null || result === void 0 ? void 0 : result.orders) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
            sum = sum + el.quantity * el.price;
        });
    }
    return sum;
});
exports.userService = {
    createUserIntoDb,
    getUsersFromDb,
    getUserFromDb,
    deleteUserFromDb,
    updateUserIntoDb,
    addOrderIntoDb,
    getOrderFromDb,
    getOrderTotalFromDb,
};
