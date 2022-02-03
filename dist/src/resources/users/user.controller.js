"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = __importDefault(require("./user.model"));
const users = user_service_1.usersService.getAllUsers;
const { addNewUser, findUser, deleteUserById, updateUserById, unassignUserTasks, } = user_service_1.usersService;
const getUsers = (_req, reply) => {
    users();
    reply.send(users());
};
exports.getUsers = getUsers;
const getUser = (req, reply) => {
    const { userId } = req.params;
    const user = findUser(userId);
    if (!user) {
        reply.code(404).send({ message: `User with id ${userId} not found` });
    }
    reply.send(user);
};
exports.getUser = getUser;
const addUser = (req, reply) => {
    const newUserData = req.body;
    const newUser = new user_model_1.default(newUserData);
    addNewUser({ ...newUser });
    reply.code(201).send({ ...newUser });
};
exports.addUser = addUser;
const deleteUser = (req, reply) => {
    const { userId } = req.params;
    const user = findUser(userId);
    if (!user) {
        reply.code(404).send({ message: `User with id ${userId} not found` });
    }
    unassignUserTasks(userId);
    deleteUserById(userId);
    reply.send({ message: `User ${userId} has been removed` });
};
exports.deleteUser = deleteUser;
const updateUser = (req, reply) => {
    const { userId } = req.params;
    const updatedUserData = req.body;
    updateUserById(userId, updatedUserData);
    const user = findUser(userId);
    reply.send(user);
};
exports.updateUser = updateUser;
