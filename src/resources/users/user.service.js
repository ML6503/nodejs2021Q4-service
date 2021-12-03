const usersRepo = require('./user.memory.repository');

// const getAll = () => usersRepo.getAll();

const { getAllUsers } = usersRepo;

const addNewUser = (user) => usersRepo.addNewUser(user);

const findUser = (id) => usersRepo.findUser(id);

const deleteUserById = (id) => usersRepo.deleteUser(id);

const updateUserById = (id, data) => usersRepo.updateUser(id, data);

module.exports = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
};
