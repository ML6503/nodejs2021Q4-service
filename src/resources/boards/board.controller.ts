import { FastifyReply, FastifyRequest } from 'fastify';
import { IBoard, IGetBoardParam, INewBoard } from '../../common/interfaces';
import { boardsService } from './board.service';
import Board from './board.model';

const boards = boardsService.getAllBoards;
const {
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
} = boardsService;

export const getBoards = async (_req: FastifyRequest, reply: FastifyReply) => {
  boards();
  await reply.send(boards());
};

export const getBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const board = findBoard(boardId);
  if (!board) {
    await reply
      .code(404)
      .send({ message: `Board with id ${boardId} not found` });
  }
  await reply.send(board);
};

export const addBoard = async (
  req: FastifyRequest<{ Body: INewBoard }>,
  reply: FastifyReply
) => {
  const newBoardData = req.body;
  const newBoard = new Board(newBoardData);

  addNewBoard({ ...newBoard });
  await reply.code(201).send({ ...newBoard });
};

export const deleteBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
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

export const updateBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam; Body: IBoard }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  updateBoardById(boardId, updatedBoardData);

  const board = findBoard(boardId);
  await reply.send(board);
};
