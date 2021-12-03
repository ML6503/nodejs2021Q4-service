const usersRepo = require('./user.memory.repository');

// const getAll = () => usersRepo.getAll();
const { getAll } = usersRepo;

const addNewUser = (user) => usersRepo.addNewUser(user);

module.exports = { getAll, addNewUser };
