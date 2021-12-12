import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IUser } from '../../common/interfaces';
;

const { getAllUsers } = usersRepo;

const addNewUser: (user: IUser) => void = (user) => usersRepo.addNewUser(user);

const findUser: (id: string) => IUser | undefined = (id) => usersRepo.findUser(id);

const deleteUserById: (id: string) => void = (id) => usersRepo.deleteUser(id);

const updateUserById: (id: string, data: IUser) => void = (id, data) => usersRepo.updateUser(id, data);

const unassignUserTasks: (id: string) => void = (id) => tasksRepo.unassignUserTasks(id);

export const usersService = {
  getAllUsers,
  addNewUser,
  findUser,
  deleteUserById,
  updateUserById,
  unassignUserTasks,
};
