"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsRepo = void 0;
const boards_db_1 = require("../../dataBase/boards.db");
let allBoards = [...boards_db_1.boards];
const getAllBoards = () => allBoards;
const addNewBoard = (board) => {
    allBoards = [...allBoards, board];
};
const findBoard = (boardId) => allBoards.find((u) => u.id === boardId);
const deleteBoard = (boardId) => {
    allBoards = allBoards.filter((u) => u.id !== boardId);
};
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
