// const usersService = require('../resources/users/user.service');
const User = require('../resources/users/user.model');
let users = require('../resources/users/users.db');

// const getAllUsers = usersService.getAll;
// const { addNewUser } = usersService;

const getUsers = async (req, reply) => {
  await users;
  reply.send(users);
};

const getUser = async (req, reply) => {
  const { userId } = req.params;

  const user = await users.find((u) => u.id === userId);
  reply.send(user);
};

const addUser = async (req, reply) => {
  const newUserData = req.body;
  const newUser = User.createUser(newUserData);

  users = [...users, { ...newUser }];
  reply.code(201).send({ ...newUser });
};

const deleteUser = async (req, reply) => {
  const { userId } = req.params;

  users = await users.filter((u) => u.id !== userId);
  reply.send({ message: `User ${userId} has been removed` });
};

const updateUser = async (req, reply) => {
  const { userId } = req.params;
  const { name, login, password } = req.body;

  users = await users.map((user) =>
    user.id === userId ? { id: userId, name, login, password } : user
  );
  const user = await users.find((u) => u.id === userId);

  reply.send(user);
};

module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };
