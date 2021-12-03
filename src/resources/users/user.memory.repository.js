const users = require('./users.db');

// {
//   // TODO: mock implementation. should be replaced during task development

//   return users;
// };
let usersDB = users;

const addNewUser = async (user) => {
  usersDB = await [...usersDB, user];
};
// const getAll = async () => usersDB;
const getAll = usersDB;

module.exports = { getAll, addNewUser };
