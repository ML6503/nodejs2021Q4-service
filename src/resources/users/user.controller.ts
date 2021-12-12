import { FastifyReply, FastifyRequest } from 'fastify';
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

export const getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
  users();
  await reply.send(users());
};

export const getUser = async (
  req: FastifyRequest<{ Params: IGetUserParam }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const user = findUser(userId);
  if (!user) {
    await reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  await reply.send(user);
};

export const addUser = async (
  req: FastifyRequest<{ Body: IUser }>,
  reply: FastifyReply
) => {
  const newUserData = req.body;
  const newUser = new User(newUserData);
  addNewUser({ ...newUser });
  await reply.code(201).send({ ...newUser });
};

export const deleteUser = async (
  req: FastifyRequest<{ Params: IGetUserParam }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;

  const user = findUser(userId);

  if (!user) {
    await reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  unassignUserTasks(userId);

  deleteUserById(userId);
  await reply.send({ message: `User ${userId} has been removed` });
};

export const updateUser = async (
  req: FastifyRequest<{ Params: IGetUserParam; Body: IUser }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  updateUserById(userId, updatedUserData);

  const user = findUser(userId);
  await reply.send(user);
};
