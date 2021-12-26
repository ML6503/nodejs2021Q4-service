import { FastifyReply, FastifyRequest } from 'fastify';
import customLogger from '../../utils/customLogger';
import { usersService } from './user.service';
import User from './user.model';
import { IGetUserParam, IUser } from '../../common/interfaces';

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
  customLogger.info('Getting all users');
  const allUsers = users();
  customLogger.debug('Sending all users to client');
  await reply.send(allUsers);
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
  customLogger.info('Fetching single user');
  const { userId } = req.params;
  const user = findUser(userId);
  if (!user) {
    customLogger.error('User not found');
    await reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  customLogger.debug('User found, sending to client');
  await reply.send(user);
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
  customLogger.info('Adding single user');
  const newUserData = req.body;
  const newUser = new User(newUserData);
  addNewUser({ ...newUser });
  customLogger.debug('User added, sending to client');
  await reply.code(201).send({ ...newUser });
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
  customLogger.info('Deleting single user');
  const { userId } = req.params;

  const user = findUser(userId);

  if (!user) {
    customLogger.error('no such user');
    await reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  unassignUserTasks(userId);

  deleteUserById(userId);
  customLogger.debug('Sending confirmation of deleted user to client');
  await reply.send({ message: `User ${userId} has been removed` });
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
  customLogger.info('Updating single user');
  const { userId } = req.params;
  const updatedUserData = req.body;

  updateUserById(userId, updatedUserData);

  const user = findUser(userId);
  customLogger.info('Sending updated user to client');
  await reply.send(user);
};
