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
/**
 * Promislike function calls users and send users in Fastify server reply
 * @param  _req - unused optional factory FastifyRequest
 * @param reply - FastifyReply
 */
const getUsers = async (_req, reply) => {
    users();
    await reply.send(users());
};
exports.getUsers = getUsers;
/**
 * Promislike function that get user id from param and
 * calls findUser func with it
 * if user is found it sends user by reply
 * otherwise sends error message and code 404
 * @param req - FastifyRequest with Params:IGetUserParam
 * @param  reply - FastifyReply
 */
const getUser = async (req, reply) => {
    const { userId } = req.params;
    req.log.info({ userId }, 'Fetching user from DB');
    try {
        const user = findUser(userId);
        if (!user) {
            req.log.warn({ userId }, 'User not found');
            await reply.code(404).send({ message: `User with id ${userId} not found` });
        }
        req.log.debug({ user }, 'User found, sending to client');
        await reply.send(user);
    }
    catch (error) {
        req.log.error(error, 'Failed to fetch user from DB');
        return reply.status(500).send('An error occurred while fetching user');
    }
};
exports.getUser = getUser;
/**
 * Promislike function that get user object from param and
 * create new user with class User
 * add this user by addNewUser function
 * and send new user in reply and the code 201
 * @param req - FastifyRequest with Body type IUser
 * @param reply - FastifyReply
 */
const addUser = async (req, reply) => {
    const newUserData = req.body;
    const newUser = new user_model_1.default(newUserData);
    addNewUser({ ...newUser });
    await reply.code(201).send({ ...newUser });
};
exports.addUser = addUser;
/**
 * Promislike function that gets user id from request param
 * find user by its id
 * if no user then replies with code 404 and send error message
 * if user is found it calls function to unassign tasks of this user
 * and delete user
 * then send message that user with id has been removed
 * @param req - FastifyRequest with Params type IGetUserParam
 * @param reply - FastifyReply
 */
const deleteUser = async (req, reply) => {
    const { userId } = req.params;
    const user = findUser(userId);
    if (!user) {
        await reply.code(404).send({ message: `User with id ${userId} not found` });
    }
    unassignUserTasks(userId);
    deleteUserById(userId);
    await reply.send({ message: `User ${userId} has been removed` });
};
exports.deleteUser = deleteUser;
/**
 * Promislike function that accepts user id and updated user object
 * in request params
 * calls function to update user with these details
 * then find updated user by id
 * and send reply with user updated details
 * @param req - FastifyRequest with Params type IGetUserParam and request Body type IUser
 * @param reply - FastifyReply
 */
const updateUser = async (req, reply) => {
    const { userId } = req.params;
    const updatedUserData = req.body;
    updateUserById(userId, updatedUserData);
    const user = findUser(userId);
    await reply.send(user);
};
exports.updateUser = updateUser;
