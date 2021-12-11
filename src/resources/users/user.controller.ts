import {usersService } from './user.service';
import User from './user.model';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IGetUserParam, IUser } from 'common/interfaces';

const users = usersService.getAllUsers;
const {
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
} = usersService;

export const getUsers = (_req: FastifyRequest, reply: FastifyReply) => {
  users();
  reply.send(users());
};

export const getUser = (req: FastifyRequest<{ Params: IGetUserParam }>, reply: FastifyReply) => {
  const { userId } = req.params;
  const user = findUser(userId);
  if (!user) {
    reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  reply.send(user);
};

export const addUser = (req: FastifyRequest<{ Body: IUser}>, reply: FastifyReply) => {
  const newUserData = req.body;
  const newUser = new User(newUserData);
  addNewUser({ ...newUser });
  reply.code(201).send({ ...newUser });
};

export const deleteUser = (req: FastifyRequest<{ Params: IGetUserParam }>, reply: FastifyReply) => {
  const { userId } = req.params;

  const user = findUser(userId);

  if (!user) {
    reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  unassignUserTasks(userId);

  deleteUserById(userId);
  reply.send({ message: `User ${userId} has been removed` });
};

export const updateUser = (req: FastifyRequest<{ Params: IGetUserParam, Body: IUser }>, reply: FastifyReply) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  updateUserById(userId, updatedUserData);

  const user = findUser(userId);
  reply.send(user);
};
