import { IUser } from '../../common/interfaces';
import { users } from '../../dataBase/users.db';

let allUsers: Array<IUser> = [...users];

/**
 * function to return all users taken from Data Base
 * @returns all users 
 */
const getAllUsers = () => allUsers;

/**
 * function to add new user to all users 
 * @param  {IUser} user
 * reassign all users with new user data
 */
const addNewUser = (user: IUser) => {
  allUsers = [...allUsers, user];
};

/**
 * function to find user by it's id
 * @param  {string} userId
 * @returns an user by id from all users
 */
const findUser = (userId: string) => allUsers.find((u) => u.id === userId);

/**
 * function that delete user from all users data by id
 * @param  {string} userId
 * @returns all users except the one found by id in param
 */
const deleteUser = (userId: string) => {
  allUsers = allUsers.filter((u) => u.id !== userId);
};

/**
 * function that update user details with data incoming in param by id
 * @param  {string} userId
 * @param  {IUser} updatedData - new updated data for specific user
 * @returns all users, where user with id from param got now updated data
 */
const updateUser = (userId: string, updatedData: IUser) => {
  allUsers = allUsers.map((user) =>
    user.id === userId ? { id: userId, ...updatedData } : user
  );
};

export const usersRepo = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUser,
  updateUser,
};
