"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const user_memory_repository_1 = require("./user.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
;
const { getAllUsers } = user_memory_repository_1.usersRepo;
const addNewUser = (user) => user_memory_repository_1.usersRepo.addNewUser(user);
const findUser = (id) => user_memory_repository_1.usersRepo.findUser(id);
const deleteUserById = (id) => user_memory_repository_1.usersRepo.deleteUser(id);
const updateUserById = (id, data) => user_memory_repository_1.usersRepo.updateUser(id, data);
const unassignUserTasks = (id) => task_memory_repository_1.tasksRepo.unassignUserTasks(id);
exports.usersService = {
    getAllUsers,
    addNewUser,
    findUser,
    deleteUserById,
    updateUserById,
    unassignUserTasks,
};
