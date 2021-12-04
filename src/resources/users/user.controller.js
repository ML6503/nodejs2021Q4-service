const usersService = require('./user.service');
const User = require('./user.model');

const users = usersService.getAllUsers;
const { addNewUser, findUser, deleteUserById, updateUserById } = usersService;

const getUsers = async (req, reply) => {
  await users();
  reply.send(users());
};

const getUser = async (req, reply) => {
  const { userId } = req.params;
  const user = await findUser(userId);
  if (!user) {
    reply.code(404).send({ message: `User with id ${userId} not found` });
  }
  reply.send(user);
};

const addUser = async (req, reply) => {
  const newUserData = req.body;
  const newUser = User.createUser(newUserData);
  await addNewUser({ ...newUser });
  reply.code(201).send({ ...newUser });
};

const deleteUser = async (req, reply) => {
  const { userId } = req.params;

  const user = await findUser(userId);

  if (!user) {
    reply.code(404).send({ message: `User with id ${userId} not found` });
  }

  await deleteUserById(userId);
  reply.send({ message: `User ${userId} has been removed` });
};

const updateUser = async (req, reply) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  await updateUserById(userId, updatedUserData);

  const user = await findUser(userId);
  reply.send(user);
};

module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };
