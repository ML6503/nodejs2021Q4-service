import { usersRepo } from './user.memory.repository';
// import { tasksRepo } from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';

const { getAllUsers } = usersRepo;

/**
 * function that calls users repo to add new user
 * @param  user - user  as IUser of the board 
 * @returns usersRepo.addNewUser function with its param 
 */
const addNewUser = async (user: IUser) => await usersRepo.addNewUser(user);

/**
 * function that calls uers repo to find user
 * @param  id  - user id type string
 * @returns usersRepo.findUser function with id in param
 * that @returns whether user: IUser or undefined
 */
const findUser = async (id: string) => await usersRepo.findUser(id);

/**
 * function that calls users repo to delete user by id
 * @param  id - user id type string
 * @returns usersRepo.deleteUser function with its param
 */
const deleteUserById = async (id: string) => await usersRepo.deleteUser(id);

/**
 * function that calls users repo in order to update users data from params
 * @param  id - user id
 * @param  data -  user updated details type IUser
 * @returns usersRepo.updateUser function with its params
 */
const updateUserById = async (id: string, data: IUser) =>
  await usersRepo.updateUser(id, data);


/**
 * function that calls users repo to unassign users task by id = 0
 * @param  id - user id
 * @returns usersRepo.unassigneUserTasks function with its param
 */
// const unassignUserTasks = (id: string) => tasksRepo.unassignUserTasks(id);

export const usersService = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  // unassignUserTasks,
};
