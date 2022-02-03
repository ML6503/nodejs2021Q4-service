"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = exports.deleteBoard = exports.addBoard = exports.getBoard = exports.getBoards = void 0;
const board_service_1 = require("./board.service");
const board_model_1 = __importDefault(require("./board.model"));
const boards = board_service_1.boardsService.getAllBoards;
const { addNewBoard, findBoard, deleteBoardById, updateBoardById, deleteBoardTasks, } = board_service_1.boardsService;
const getBoards = async (_req, reply) => {
    await boards();
    reply.send(boards());
};
exports.getBoards = getBoards;
const getBoard = async (req, reply) => {
    const { boardId } = req.params;
    const board = await findBoard(boardId);
    if (!board) {
        reply.code(404).send({ message: `Board with id ${boardId} not found` });
    }
    reply.send(board);
};
exports.getBoard = getBoard;
const addBoard = async (req, reply) => {
    const newBoardData = req.body;
    const newBoard = new board_model_1.default(newBoardData);
    await addNewBoard({ ...newBoard });
    reply.code(201).send({ ...newBoard });
};
exports.addBoard = addBoard;
const deleteBoard = async (req, reply) => {
    const { boardId } = req.params;
    const board = await findBoard(boardId);
    if (!board) {
        reply.code(404).send({ message: `Board with id ${boardId} not found` });
    }
    await deleteBoardTasks(boardId);
    await deleteBoardById(boardId);
    reply.send({ message: `The board ${boardId} has been deleted` });
};
exports.deleteBoard = deleteBoard;
const updateBoard = async (req, reply) => {
    const { boardId } = req.params;
    const updatedBoardData = req.body;
    await updateBoardById(boardId, updatedBoardData);
    const board = await findBoard(boardId);
    reply.send(board);
};
exports.updateBoard = updateBoard;
