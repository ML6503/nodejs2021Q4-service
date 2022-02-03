"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsService = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
const { getAllBoards } = board_memory_repository_1.boardsRepo;
/**
 * function that calls boards repo to add new board
 * @param  board - board object type IBoard
 * @returns call to boardsRepo.addNewBoard func with board details
 */
const addNewBoard = (board) => board_memory_repository_1.boardsRepo.addNewBoard(board);
/**
 * calls boards repo to find board by id
 * @param id - board id type string
 * @returns call to boardsRepo.findBoard func to get board by id
 */
const findBoard = (id) => board_memory_repository_1.boardsRepo.findBoard(id);
/**
 * call boards repo to delete board by id
 * @param id - board id type string
 * @returns call to boardsRepo.deleteBoard func to delete board by id
 */
const deleteBoardById = (id) => board_memory_repository_1.boardsRepo.deleteBoard(id);
/**
 * updates board by id got with received new details
 * @param id - board id type string
 * @param data - board new data with type INewBoard
 * @returns call to boardsRepo.updateBoard func to update board
 */
const updateBoardById = (id, data) => board_memory_repository_1.boardsRepo.updateBoard(id, data);
/**
 * delete board tasks by board id
 * @param id - board id type string
 * @returns call to boardsRepo.deleteBoardTasks func to delete tasks
 */
const deleteBoardTasks = (id) => task_memory_repository_1.tasksRepo.deleteBoardTasks(id);
exports.boardsService = {
    getAllBoards,
    addNewBoard,
    findBoard,
    deleteBoardById,
    updateBoardById,
    deleteBoardTasks,
};
