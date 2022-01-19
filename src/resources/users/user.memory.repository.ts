import User from '../../entity/User';
import { getRepository } from 'typeorm';
import { IUser } from '../../common/interfaces';
// import { users } from '../../dataBase/users.db';

// let allUsers: Array<IUser> = [...users];
// const userRepository =  getRepository(User);
/**
 * function to return all users taken from Data Base
 * @returns all users or empty array if none 
 */
// const getAllUsers = (): IUser[] | [] => allUsers;
const getAllUsers = async () => {
  // const allUsers = await userRepository.find();
  return await getRepository(User).find();
  // return allUsers;
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
  return  await getRepository(User).save(user);
  // return singleUser;
};

/**
 * function to find user by it's id
 * @param userId - user id type string
 * @returns an user by id found from all users
 */
const findUser = async (userId: string) => {
  // allUsers.find((u) => u.id === userId);
  const singleUser = await getRepository(User).findOne({ id: userId });
  return singleUser;
};

/**
 * delete user from all users data by id
 * @param userId - user id type string
 * @returns all users except the one found by id in param
 */
const deleteUser = async (userId: string) => {
  // allUsers = allUsers.filter((u) => u.id !== userId);
  const singleUser = await getRepository(User).findOne({ id: userId });
  if(singleUser) {
    await getRepository(User).delete({ id: userId });
    return getAllUsers();
  }
  else {
    throw new Error('User not found');
  }
};

/**
 * update user details with data incoming in param by id
 * @param  userId - user id type string
 * @param  updatedData - new updated data for user type IUser
 * @returns all users, where user with id from param got now updated data
 */
const updateUser = async (userId: string, updatedData: IUser) => {
  // allUsers = allUsers.map((user) =>
  //   user.id === userId ? { id: userId, ...updatedData } : user
  // );
  const singleUser = await getRepository(User).findOne({ id: userId });
  if(singleUser) {
   const updatedUser = await getRepository(User).update({ id: userId }, updatedData);
    return updatedUser;
  }
  else {
    throw new Error('User not found');
  }

};

export const usersRepo = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUser,
  updateUser,
};
