"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRepo = void 0;
const boards_db_1 = require("../../dataBase/boards.db");
let allBoards = [...boards_db_1.boards];
/**
 * function to obtain all boards
 * @returns all boards type IBoard or empty array
 */
const getAllBoards = () => allBoards;
/**
 * func to add new board to all board
 * @param board - board type IBoard
 * reassign all boards with new board data
 */
const addNewBoard = (board) => {
    allBoards = [...allBoards, board];
};
/**
 * finds user by its id
 * @param  boardId - board id type string
 * @returns user found from all users array by it id
 */
const findBoard = (boardId) => allBoards.find((u) => u.id === boardId);
/**
 * delete board by id
 * @param  boardId - board if type string
 * @returns all boards reassigned with boards except the one found by id in param
 */
const deleteBoard = (boardId) => {
    allBoards = allBoards.filter((u) => u.id !== boardId);
};
/**
 * update board details with data incoming in param by received id
 * @param  boardId  - board if type string
 * @param  updatedBoardData -  board if type INewBoard
 * reassigns allBoards with the boards where updated board has new details
 */
const updateBoard = (boardId, updatedBoardData) => {
    const newBoard = { id: boardId, ...updatedBoardData };
    allBoards = allBoards.map((board) => board.id === boardId ? newBoard : board);
};
exports.boardsRepo = {
    getAllBoards,
    addNewBoard,
    findBoard,
    deleteBoard,
    updateBoard,
};
