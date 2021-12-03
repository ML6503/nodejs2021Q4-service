const usersService = require('../resources/users/user.service');
const User = require('../resources/users/user.model');
// let users = require('../resources/users/users.db');

const users = usersService.getAllUsers;
const { addNewUser, findUser, deleteUserById, updateUserById } = usersService;

const getUsers = async (req, reply) => {
  await users();
  reply.send(users());
};

const getUser = async (req, reply) => {
  const { userId } = req.params;
  const user = findUser(userId);
  //   const user = await users.find((u) => u.id === userId);
  reply.send(user);
};

const addUser = async (req, reply) => {
  const newUserData = req.body;
  const newUser = User.createUser(newUserData);
  await addNewUser({ ...newUser });
  //   users = [...users, { ...newUser }];
  reply.code(201).send({ ...newUser });
};

const deleteUser = async (req, reply) => {
  const { userId } = req.params;

  await deleteUserById(userId);
  //   users = await users.filter((u) => u.id !== userId);
  reply.send({ message: `User ${userId} has been removed` });
};

const updateUser = async (req, reply) => {
  const { userId } = req.params;
  //   const { name, login, password } = req.body;
  const updatedUserData = req.body;
  // TODO from service
  await updateUserById(userId, updatedUserData);
  //   users = await users.map((user) =>
  //     user.id === userId ? { id: userId, name, login, password } : user
  //   );
  //   const user = await users.find((u) => u.id === userId);
  const user = await findUser(userId);
  reply.send(user);
};

module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };
