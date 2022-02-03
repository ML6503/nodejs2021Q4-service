"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const users_db_1 = require("../../dataBase/users.db");
let allUsers = [...users_db_1.users];
/**
 * function to return all users taken from Data Base
 * @returns all users or empty array if none
 */
const getAllUsers = () => allUsers;
/**
 * function to add new user to all users
 * @param user - new user details object type IUser
 * reassign all users with new user data
 */
const addNewUser = (user) => {
    allUsers = [...allUsers, user];
};
/**
 * function to find user by it's id
 * @param userId - user id type string
 * @returns an user by id found from all users
 */
const findUser = (userId) => allUsers.find((u) => u.id === userId);
/**
 * delete user from all users data by id
 * @param userId - user id type string
 * @returns all users except the one found by id in param
 */
const deleteUser = (userId) => {
    allUsers = allUsers.filter((u) => u.id !== userId);
};
/**
 * update user details with data incoming in param by id
 * @param  userId - user id type string
 * @param  updatedData - new updated data for user type IUser
 * @returns all users, where user with id from param got now updated data
 */
const updateUser = (userId, updatedData) => {
    allUsers = allUsers.map((user) => user.id === userId ? { id: userId, ...updatedData } : user);
};
exports.usersRepo = {
    getAllUsers,
    addNewUser,
    findUser,
    deleteUser,
    updateUser,
};
