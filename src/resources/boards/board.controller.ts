import { FastifyReply, FastifyRequest, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteHandlerMethod } from 'fastify';
import { IncomingMessage, Server } from 'http';
import { IQueryString, IRequestBoard } from '../../common/interfaces';
const boardsService = require('./board.service');
import Board from './board.model';
import { requestBoardIdGeneric } from './board.router';

const boards = boardsService.getAllBoards;
const {
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
} = boardsService;

export const getBoards = async (_req: FastifyRequest, reply: FastifyReply) => {
  await boards();
  reply.send(boards());
};

export const getBoard
= async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);
  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  reply.send(board);
};

export const addBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const newBoardData = req.body;
  const newBoard = new Board(newBoardData);

  await addNewBoard({ ...newBoard });
  reply.code(201).send({ ...newBoard });
};

export const deleteBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);

  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  await deleteBoardTasks(boardId);

  await deleteBoardById(boardId);
  reply.send({ message: `The board ${boardId} has been deleted` });
};

export const updateBoard = async (req: IRequestBoard, reply: FastifyReply) => {
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  await updateBoardById(boardId, updatedBoardData);

  const board = await findBoard(boardId);
  reply.send(board);
};
