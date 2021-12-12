import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IBoard, INewBoard } from '../../common/interfaces';

const { getAllBoards } = boardsRepo;

const addNewBoard = (board: IBoard) => boardsRepo.addNewBoard(board);

const findBoard = (id: string) => boardsRepo.findBoard(id);

const deleteBoardById = (id: string) => boardsRepo.deleteBoard(id);

const updateBoardById = (id: string, data: INewBoard) =>
  boardsRepo.updateBoard(id, data);

const deleteBoardTasks = (id: string) => tasksRepo.deleteBoardTasks(id);

export const boardsService = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
};
