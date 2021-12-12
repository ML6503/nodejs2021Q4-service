import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IBoard, INewBoard } from 'common/interfaces';

const { getAllBoards } = boardsRepo;

const addNewBoard: (board: IBoard) => void = (board) =>
  boardsRepo.addNewBoard(board);

const findBoard: (id: string) => IBoard | undefined = (id) =>
  boardsRepo.findBoard(id);

const deleteBoardById: (id: string) => void = (id) =>
  boardsRepo.deleteBoard(id);

const updateBoardById: (id: string, data: INewBoard) => void = (id, data) =>
  boardsRepo.updateBoard(id, data);

const deleteBoardTasks: (id: string) => void = (id) =>
  tasksRepo.deleteBoardTasks(id);

export const boardsService = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
};
