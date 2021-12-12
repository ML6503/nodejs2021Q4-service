import { IUser } from '../../common/interfaces';
;
import { users } from '../../dataBase/users.db';

let allUsers: Array<IUser> = [...users];
const getAllUsers = () => allUsers;

const addNewUser: (user: IUser) => void = (user) => {
  allUsers = [...allUsers, user];
};

const findUser: (userId: string) => IUser | undefined = (userId) => allUsers.find((u) => u.id === userId);

const deleteUser: (userId: string) => void = (userId) => {
  allUsers = allUsers.filter((u) => u.id !== userId);
};

const updateUser: (userId: string, updatedData: IUser) => void = (userId, updatedData) => {
  allUsers = allUsers.map((user) => user.id === userId ? { id: userId, ...updatedData } : user
  );
};

export const usersRepo = { getAllUsers, addNewUser, findUser, deleteUser, updateUser };
