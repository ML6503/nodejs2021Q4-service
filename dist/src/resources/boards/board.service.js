"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsService = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
const { getAllBoards } = board_memory_repository_1.boardsRepo;
const addNewBoard = (board) => board_memory_repository_1.boardsRepo.addNewBoard(board);
const findBoard = (id) => board_memory_repository_1.boardsRepo.findBoard(id);
const deleteBoardById = (id) => board_memory_repository_1.boardsRepo.deleteBoard(id);
const updateBoardById = (id, data) => board_memory_repository_1.boardsRepo.updateBoard(id, data);
const deleteBoardTasks = (id) => task_memory_repository_1.tasksRepo.deleteBoardTasks(id);
exports.boardsService = {
    getAllBoards,
    addNewBoard,
    findBoard,
    deleteBoardById,
    updateBoardById,
    deleteBoardTasks,
};
