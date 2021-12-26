import { FastifyReply, FastifyRequest } from 'fastify';
import customLogger from '../../utils/customLogger';
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

/**
 * Promiselike function calls boards and send them in Fastify server reply
 * @param   _req - unused here factory FastifyRequest
 * @param  reply - FastifyReply
 */
export const getBoards = async (_req: FastifyRequest, reply: FastifyReply) => {
  customLogger.info('getting single board');
  const allBoards = boards();
  await reply.send(allBoards);
};

/**
 * Promiselike function that get board's id from param and
 * calls findBoard func with it
 * if board is found it sends board by reply
 * otherwise sends error message and code 404
 * @param req - FastifyRequest with Params type IGetBoardParam
 * @param  reply - FastifyReply
 */
export const getBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
  customLogger.info('getting single board');
  const { boardId } = req.params;
  const board = findBoard(boardId);
  if (!board) {
    customLogger.error('not found');
    await reply
      .code(404)
      .send({ message: `Board with id ${boardId} not found` });
  }
  customLogger.debug(`Board with id ${boardId} found, sending to client`);
  await reply.send(board);
};

/**
 * Promiselike function that get board object from param and
 * create new Board with class Board
 * add this board by addNewBoard function
 * and send new user in reply and the code 201
 * @param  req - FastifyRequest with Body type INewBoard
 * @param  reply - FastifyReply
 */
export const addBoard = async (
  req: FastifyRequest<{ Body: INewBoard }>,
  reply: FastifyReply
) => {
  customLogger.info('adding single board');
  const newBoardData = req.body;
  const newBoard = new Board(newBoardData);

  addNewBoard({ ...newBoard });
  customLogger.debug(`New Board added, sending to client`);
  await reply.code(201).send({ ...newBoard });
};

/**
 * Promiselike function that gets board id from request param
 * find board by its id
 * if no board then replies with code 404 and send error message
 * if board is found it calls function to delete it
 * then send message that board with id has been removed
 * @param req - FastifyRequest with Params type IGetBoardParam
 * @param reply - FastifyReply
 */
export const deleteBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam }>,
  reply: FastifyReply
) => {
  customLogger.info('Deleting single board');
  const { boardId } = req.params;
  const board = findBoard(boardId);

  if (!board) {
    customLogger.warn('No such board');
    await reply
      .code(404)
      .send({ message: `Board with id ${boardId} not found` });
  }
  deleteBoardTasks(boardId);

  deleteBoardById(boardId);
  customLogger.debug(`Board with id ${boardId} deleted, sending to client`);
  await reply.send({ message: `The board ${boardId} has been deleted` });
};

/**
 * Promiselike function that accepts board id and updated board details
 * in request params
 * calls function to update board with these details
 * then find updated board by id
 * and send reply with board updated details
 * @param  req - FastifyRequest with Params type IGetBoardParam and Body type IBoard
 * @param  reply - FastifyReply
 */
export const updateBoard = async (
  req: FastifyRequest<{ Params: IGetBoardParam; Body: IBoard }>,
  reply: FastifyReply
) => {
  customLogger.info('Updating single board');
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  updateBoardById(boardId, updatedBoardData);

  const board = findBoard(boardId);
  customLogger.debug('Single board updated, sending to client');
  await reply.send(board);
};
