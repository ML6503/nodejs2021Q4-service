import { FastifyReply, FastifyRequest } from 'fastify';
// import { getRepository } from 'typeorm';
import { usersService } from './user.service';
// import User from './user.model';
// import User from '../../entity/User';
import { IGetUserParam, IUser } from '../../common/interfaces';

const users = usersService.getAllUsers;
const {
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  // unassignUserTasks,
} = usersService;

// console.log('userRepo', getRepository(User));
// const userRepository = getRepository(User);

/**
 * Promislike function calls users and send users in Fastify server reply
 * @param  _req - unused optional factory FastifyRequest
 * @param reply - FastifyReply
 */
export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  const allUsers = await users();
  // const allUsers = await userRepository.find();
  // const allUsers: IUser[] | [] = await fastify.db.inventory.find({
  //   relations: ['user'],
  // });

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
  const { userId } = req.params;
  req.log.info({ userId }, 'Fetching user from DB');
  try {
    const user = await findUser(userId);

    if (!user) {
      req.log.warn({ userId }, 'User not found');
      await reply
        .code(404)
        .send({ message: `User with id ${userId} not found` });
    }
    req.log.debug({ user }, 'User found, sending to client');
    return reply.send(user);
  } catch (error) {
    req.log.error(error, 'Failed to fetch user from DB');
    return reply.status(500).send('An error occurred while fetching user');
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
  // const newUser = new User(newUserData);
  // await addNewUser({ ...newUser });
  const newUser= await addNewUser(newUserData);
  // await userRepository.save(newUserData);
  await reply.code(201).send(newUser);
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

  const user = await findUser(userId);
  // const user = await userRepository.findOne(userId);

  if (!user) {
    await reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  // unassignUserTasks(userId);

  await deleteUserById(userId);
  // else {
  // await userRepository.remove(user);
  await reply.send({ message: `User ${userId} has been removed` });
  // }
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

  await updateUserById(userId, updatedUserData);

  const user = await findUser(userId);
  await reply.send(user);
};
