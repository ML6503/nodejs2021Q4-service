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
/**
 * Promiselike function calls boards and send them in Fastify server reply
 * @param   _req - unused here factory FastifyRequest
 * @param  reply - FastifyReply
 */
const getBoards = async (_req, reply) => {
    boards();
    await reply.send(boards());
};
exports.getBoards = getBoards;
/**
 * Promiselike function that get board's id from param and
 * calls findBoard func with it
 * if board is found it sends board by reply
 * otherwise sends error message and code 404
 * @param req - FastifyRequest with Params type IGetBoardParam
 * @param  reply - FastifyReply
 */
const getBoard = async (req, reply) => {
    const { boardId } = req.params;
    const board = findBoard(boardId);
    if (!board) {
        await reply
            .code(404)
            .send({ message: `Board with id ${boardId} not found` });
    }
    await reply.send(board);
};
exports.getBoard = getBoard;
/**
 * Promiselike function that get board object from param and
 * create new Board with class Board
 * add this board by addNewBoard function
 * and send new user in reply and the code 201
 * @param  req - FastifyRequest with Body type INewBoard
 * @param  reply - FastifyReply
 */
const addBoard = async (req, reply) => {
    const newBoardData = req.body;
    const newBoard = new board_model_1.default(newBoardData);
    addNewBoard({ ...newBoard });
    await reply.code(201).send({ ...newBoard });
};
exports.addBoard = addBoard;
/**
 * Promiselike function that gets board id from request param
 * find board by its id
 * if no board then replies with code 404 and send error message
 * if board is found it calls function to delete it
 * then send message that board with id has been removed
 * @param req - FastifyRequest with Params type IGetBoardParam
 * @param reply - FastifyReply
 */
const deleteBoard = async (req, reply) => {
    const { boardId } = req.params;
    const board = findBoard(boardId);
    if (!board) {
        await reply
            .code(404)
            .send({ message: `Board with id ${boardId} not found` });
    }
    deleteBoardTasks(boardId);
    deleteBoardById(boardId);
    await reply.send({ message: `The board ${boardId} has been deleted` });
};
exports.deleteBoard = deleteBoard;
/**
 * Promiselike function that accepts board id and updated board details
 * in request params
 * calls function to update board with these details
 * then find updated board by id
 * and send reply with board updated details
 * @param  req - FastifyRequest with Params type IGetBoardParam and Body type IBoard
 * @param  reply - FastifyReply
 */
const updateBoard = async (req, reply) => {
    const { boardId } = req.params;
    const updatedBoardData = req.body;
    updateBoardById(boardId, updatedBoardData);
    const board = findBoard(boardId);
    await reply.send(board);
};
exports.updateBoard = updateBoard;
