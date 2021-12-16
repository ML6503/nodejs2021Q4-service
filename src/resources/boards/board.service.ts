import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { IBoard, INewBoard } from '../../common/interfaces';

const { getAllBoards } = boardsRepo;

/**
 * function that calls boards repo to add new board
 * @param  {IBoard} board
 * @returns call to boardsRepo.addNewBoard func with board details
 */
const addNewBoard = (board: IBoard) => boardsRepo.addNewBoard(board);

/**
 * calls boards repo to find board by id
 * @param  {string} id board id
 * @returns call to boardsRepo.findBoard func to get board by id 
 */
const findBoard = (id: string) => boardsRepo.findBoard(id);

/**
 * call boards repo to delete board by id
 * @param  {string} id board id
 * @returns call to boardsRepo.deleteBoard func to delete board by id
 */
const deleteBoardById = (id: string) => boardsRepo.deleteBoard(id);

/**
 * updates board by id got with received new details
 * @param  {string} id board id
 * @param  {INewBoard} data board new data with @type INewBoard
 * @returns call to boardsRepo.updateBoard func to update board
 */
const updateBoardById = (id: string, data: INewBoard) =>
  boardsRepo.updateBoard(id, data);

  /**
   * delete board tasks by board id
   * @param  {string} id board id
   * @returns call to boardsRepo.deleteBoardTasks func to delete tasks
   */
const deleteBoardTasks = (id: string) => tasksRepo.deleteBoardTasks(id);

export const boardsService = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
};
