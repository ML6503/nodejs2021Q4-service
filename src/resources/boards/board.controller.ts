import { FastifyReply, FastifyRequest } from 'fastify';
import { IRequestBoard } from '../../common/interfaces';
const boardsService = require('./board.service');
import Board from './board.model';

const boards = boardsService.getAllBoards;
const {
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
} = boardsService;

const getBoards = async (_req: FastifyRequest, reply: FastifyReply) => {
  await boards();
  reply.send(boards());
};

const getBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);
  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  reply.send(board);
};

const addBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const newBoardData = req.body;
  const newBoard = new Board(newBoardData);

  await addNewBoard({ ...newBoard });
  reply.code(201).send({ ...newBoard });
};

const deleteBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);

  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  await deleteBoardTasks(boardId);

  await deleteBoardById(boardId);
  reply.send({ message: `The board ${boardId} has been deleted` });
};

const updateBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  await updateBoardById(boardId, updatedBoardData);

  const board = await findBoard(boardId);
  reply.send(board);
};

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
