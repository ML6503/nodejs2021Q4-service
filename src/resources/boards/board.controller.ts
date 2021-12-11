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
  await boards();
  reply.send(boards());
};

export const getBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);
  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  reply.send(board);
};

export const addBoard = async (
  req: FastifyRequest<{ Body: INewBoard }>,
  reply: FastifyReply
) => {
  const newBoardData = req.body;
  const newBoard = new Board(newBoardData);

  await addNewBoard({ ...newBoard });
  reply.code(201).send({ ...newBoard });
};

export const deleteBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);

  if (!board) {
    reply.code(404).send({ message: `Board with id ${boardId} not found` });
  }
  await deleteBoardTasks(boardId);

  await deleteBoardById(boardId);
  reply.send({ message: `The board ${boardId} has been deleted` });
};

export const updateBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam; Body: IBoard }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  await updateBoardById(boardId, updatedBoardData);

  const board = await findBoard(boardId);
  reply.send(board);
};
