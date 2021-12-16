import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';

const { getAllUsers } = usersRepo;

/**
 * function that calls users repo to add new user
 * @param  {user} user  of the board with the @type IUser
 * @returns usersRepo.addNewUser function with its param 
 */
const addNewUser: (param: IUser) => void = (user: IUser) => usersRepo.addNewUser(user);

/**
 * function that calls uers repo to find user
 * @param  {id}  id of the user with the @type string
 * @returns usersRepo.findUser function with id in param
 * that @returns whether user @type IUser or undefined
 */
const findUser: (param: string) => IUser | undefined = (id: string) => usersRepo.findUser(id);

/**
 * function that calls users repo to delete user by id
 * @param  {string} id - user id 
 * @returns usersRepo.deleteUser function with its param
 */
const deleteUserById: (param: string) => void = (id: string) => usersRepo.deleteUser(id);

/**
 * function that calls users repo in order to update users data from params
 * @param  {string} id
 * @param  {IUser} data
 * @returns usersRepo.updateUser function with its params
 */
const updateUserById: (param1: string, param2: IUser) => void = (id: string, data: IUser) =>
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
