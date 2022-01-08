import { IUser } from '../../common/interfaces';
import { users } from '../../../dataBase/users.db';

let allUsers: Array<IUser> = [...users];

/**
 * function to return all users taken from Data Base
 * @returns all users or empty array if none
 */
const getAllUsers = (): IUser[] | [] => allUsers;

/**
 * function to add new user to all users 
 * @param user - new user details object type IUser
 * reassign all users with new user data
 */
const addNewUser = (user: IUser) => {
  allUsers = [...allUsers, user];
};

/**
 * function to find user by it's id
 * @param userId - user id type string
 * @returns an user by id found from all users
 */
const findUser = (userId: string) => allUsers.find((u) => u.id === userId);

/**
 * delete user from all users data by id
 * @param userId - user id type string
 * @returns all users except the one found by id in param
 */
const deleteUser = (userId: string) => {
  allUsers = allUsers.filter((u) => u.id !== userId);
};

/**
 * update user details with data incoming in param by id
 * @param  userId - user id type string
 * @param  updatedData - new updated data for user type IUser
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
