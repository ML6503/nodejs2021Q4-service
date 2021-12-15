import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';

const { getAllUsers } = usersRepo;
/**
 * function that calls users repo to add new user
 * @param  {IUser} user - user of the board
 * @returns usersRepo.addNewUser function with its param 
 */
const addNewUser = (user: IUser) => usersRepo.addNewUser(user);

/**
 * function that calls uers repo to find user
 * @param  {string} id - user id 
 * @returns usersRepo.findUser function with its param
 */
const findUser = (id: string) => usersRepo.findUser(id);

/**
 * function that calls users repo to delete user by id
 * @param  {string} id - user id 
 * @returns usersRepo.deleteUser function with its param
 */
const deleteUserById = (id: string) => usersRepo.deleteUser(id);

/**
 * function that calls users repo in order to update users data from params
 * @param  {string} id
 * @param  {IUser} data
 * @returns usersRepo.updateUser function with its params
 */
const updateUserById = (id: string, data: IUser) =>
  usersRepo.updateUser(id, data);


/**
 * function that calls users repo to unassign users task by id = 0
 * @param  {string} id
 * @returns usersRepo.unassigneUserTasks function with its param
 */
const unassignUserTasks = (id: string) => tasksRepo.unassignUserTasks(id);

export const usersService = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
};
