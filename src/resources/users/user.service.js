const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const { getAllUsers } = usersRepo;

const addNewUser = (user) => usersRepo.addNewUser(user);

const findUser = (id) => usersRepo.findUser(id);

const deleteUserById = (id) => usersRepo.deleteUser(id);

const updateUserById = (id, data) => usersRepo.updateUser(id, data);

const unassignUserTasks = (id) => taskRepo.unassignUserTasks(id);

module.exports = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
};
