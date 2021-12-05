const users = require('../../dataBase/users.db');

// {
//   // TODO: mock implementation. should be replaced during task development

//   return users;
// };
let allUsers = [...users];
const getAllUsers = () => allUsers;

const addNewUser = async (user) => {
  allUsers = await [...allUsers, user];
};

const findUser = (userId) => allUsers.find((u) => u.id === userId);

const deleteUser = async (userId) => {
  allUsers = await allUsers.filter((u) => u.id !== userId);
};

const updateUser = async (userId, updatedData) => {
  allUsers = await allUsers.map((user) =>
    user.id === userId ? { id: userId, ...updatedData } : user
  );
};

module.exports = { getAllUsers, addNewUser, findUser, deleteUser, updateUser };
