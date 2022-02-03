"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
;
const users_db_1 = require("../../dataBase/users.db");
let allUsers = [...users_db_1.users];
const getAllUsers = () => allUsers;
const addNewUser = (user) => {
    allUsers = [...allUsers, user];
};
const findUser = (userId) => allUsers.find((u) => u.id === userId);
const deleteUser = (userId) => {
    allUsers = allUsers.filter((u) => u.id !== userId);
};
const updateUser = (userId, updatedData) => {
    allUsers = allUsers.map((user) => user.id === userId ? { id: userId, ...updatedData } : user);
};
exports.usersRepo = { getAllUsers, addNewUser, findUser, deleteUser, updateUser };
