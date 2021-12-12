import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';

const { getAllUsers } = usersRepo;

const addNewUser = (user: IUser) => usersRepo.addNewUser(user);

const findUser = (id: string) => usersRepo.findUser(id);

const deleteUserById = (id: string) => usersRepo.deleteUser(id);

const updateUserById = (id: string, data: IUser) =>
  usersRepo.updateUser(id, data);

const unassignUserTasks = (id: string) => tasksRepo.unassignUserTasks(id);

export const usersService = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
};
