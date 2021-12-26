import { FastifyReply, FastifyRequest } from 'fastify';
import { usersService } from './user.service';
import User from './user.model';
import { IGetUserParam, IUser } from '../../common/interfaces';
import customLogger from '../../utils/customLogger';
import { DBError } from '../../utils/DBError';

const users = usersService.getAllUsers;
const {
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
} = usersService;

/**
 * Promislike function calls users and send users in Fastify server reply
 * @param  _req - unused optional factory FastifyRequest
 * @param reply - FastifyReply
 */
export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  customLogger.info('Fetching all users from DB');
  try {
    const allUsers = users();
    customLogger.debug('Sending all users to client');
    await reply.send(allUsers);
  } catch (e) {
    customLogger.error(e, 'Failed to fetch all users from DB');
    throw new DBError(500, 'An error occurred while fetching users');
  }
};

/**
 * Promislike function that get user id from param and
 * calls findUser func with it
 * if user is found it sends user by reply
 * otherwise sends error message and code 404
 * @param req - FastifyRequest with Params:IGetUserParam
 * @param  reply - FastifyReply
 */
export const getUser = async (
  req: FastifyRequest<{ Params: IGetUserParam }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params;
  // req.log.info({ userId }, 'Fetching user from DB');
  customLogger.info({ userId }, 'Fetching user from DB');
  try {
    const user = findUser(userId);

    if (!user) {
      // req.log.warn({ userId }, 'User not found');
      customLogger.warn({ userId }, 'User not found');
      await reply
        .code(404)
        .send({ message: `User with id ${userId} not found` });
    }
    customLogger.debug({ user }, 'User found, sending to client');
    await reply.send(user);
  } catch (e) {
    // req.log.error(error, 'Failed to fetch user from DB');
    customLogger.error(e, 'Failed to fetch user from DB');
    // reply.status(500).send('An error occurred while fetching user');
    throw new DBError(500, 'An error occurred while fetching user');
  }
};

/**
 * Promislike function that get user object from param and
 * create new user with class User
 * add this user by addNewUser function
 * and send new user in reply and the code 201
 * @param req - FastifyRequest with Body type IUser
 * @param reply - FastifyReply
 */
export const addUser = async (
  req: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) => {
  const newUserData = req.body;
  try {
    const newUser = new User(newUserData);
    addNewUser({ ...newUser });
    req.log.debug({ ...newUser }, 'New user is added, sending to client');
    await reply.code(201).send({ ...newUser });
  } catch (e) {
    customLogger.error(e, 'Failed to add user to DB');
    throw new DBError(500, 'An error occurred while adding user');
  }
};

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
export const deleteUser = async (
  req: FastifyRequest<{ Params: IGetUserParam }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  try {
    const user = findUser(userId);

    if (!user) {
      customLogger.warn({ userId }, 'User not found');
      await reply
        .code(404)
        .send({ message: `User with id ${userId} not found` });
    }
    unassignUserTasks(userId);
    req.log.debug(`User ${userId}'s tasks has been deleted, deleting user now`);
    deleteUserById(userId);
    await reply.code(204).send({ message: `User ${userId} has been deleted` });
  } catch (e) {
    customLogger.error(e, 'Failed to delete user from DB');
    throw new DBError(500, 'An error occurred while deleting user');
  }
};
/**
 * Promislike function that accepts user id and updated user object
 * in request params
 * calls function to update user with these details
 * then find updated user by id
 * and send reply with user updated details
 * @param req - FastifyRequest with Params type IGetUserParam and request Body type IUser
 * @param reply - FastifyReply
 */
export const updateUser = async (
  req: FastifyRequest<{ Params: IGetUserParam; Body: IUser }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const updatedUserData = req.body;
  try {
    updateUserById(userId, updatedUserData);
    req.log.debug(`User ${userId} has been updated, sending to client`);
    const user = findUser(userId);
    await reply.send(user);
  } catch (e) {
    customLogger.error(e, 'Failed to update user at DB');
    throw new DBError(500, 'An error occurred while updating user');
  }
};
