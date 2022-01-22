import { getRepository } from 'typeorm';
import User from '../../entity/User';
import { IUser } from '../../common/interfaces';
import UserModel from './user.model';
import Task from '../../entity/Task';

// import { users } from '../../dataBase/users.db';

// let allUsers: Array<IUser> = [...users];

/**
 * function to return all users taken from Data Base
 * @returns all users or empty array if none
 */

// const getAllUsers = (): IUser[] | [] => allUsers;
const getAllUsers = async () => {
  // const allUsers = await userRepository.find();
  const allUsers = await getRepository(User).find();
  
  return allUsers.map((user) => new UserModel(user));
};

/**
 * function to add new user to all users
 * @param user - new user details object type IUser
 * @returns user
 * add new user to db user repo
 */
const addNewUser = async (userDetails: IUser) => {
  // allUsers = [...allUsers, user];
  const user = new User();
    user.name = userDetails.name;
    user.login = userDetails.login;
    user.password = userDetails.password;
  const singleUser =  await getRepository(User).save(user);
  return singleUser;
};

/**
 * function to find user by it's id
 * @param userId - user id type string
 * @returns an user by id found from all users
 */
const findUser = async (userId: string) => {
  // allUsers.find((u) => u.id === userId);
  const singleUser = await getRepository(User).findOne(userId);
  return singleUser;
};

/**
 * delete user from all users data by id
 * @param userId - user id type string
 * @returns all users except the one found by id in param
 */
const deleteUser = async (userId: string) => {
  // allUsers = allUsers.filter((u) => u.id !== userId);
  const userRepository = getRepository(User);
  const taskRepository = getRepository(Task);
  const singleUser = await userRepository.findOne({ id: userId });
  if(singleUser) {
    // executes UPDATE task SET userId = null WHERE userId  = userId from param
    await taskRepository.update({ userId }, { userId: null })
    await userRepository.delete({ id: userId });
    return getAllUsers();
  }
  
    throw new Error('User not found');
  
};

/**
 * update user details with data incoming in param by id
 * @param  userId - user id type string
 * @param  updatedData - new updated data for user type IUser
 * @returns all users, where user with id from param got now updated data
 */
const updateUser = async (userId: string, updatedData: IUser) => {

  const userRepository = getRepository(User);

  const singleUser = await userRepository.findOne(userId);
  if(singleUser) {
    const updatedUser = userRepository.merge(singleUser, updatedData);
   
   const results = await userRepository.save(updatedUser); 
   return results;
  }
  
    throw new Error('User not found');
};

export const usersRepo = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUser,
  updateUser,
};
