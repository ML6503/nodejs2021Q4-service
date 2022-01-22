import { getRepository } from 'typeorm';
import Task from '../../entity/Task';
import { IBoard } from '../../common/interfaces';
import Board from '../../entity/Board';
import BoardModel from './board.model';


/**
 * function to obtain all boards
 * @returns all boards type IBoard or empty array
 */
const getAllBoards = async () => {
 
  const allBoards = await getRepository(Board).find();
  return allBoards.map((board) => new BoardModel(board));
};

/**
 * func to add new board to all board
 * @param board - board type IBoard
 * reassign all boards with new board data
 */
const addNewBoard = async (boardDetails: IBoard) => {

  const board= new Board();
  board.title = boardDetails.title;
  board.columns = boardDetails.columns;
  
  const addedBoard = await getRepository(Board).save(board);
  return addedBoard;
  
};
/**
 * finds user by its id
 * @param  boardId - board id type string
 * @returns user found from all users array by it id
 */

const findBoard = async (id: string) => {

  const singleBoard = await getRepository(Board).findOne(id);
  return singleBoard;
};

/**
 * delete board by id
 * @param  boardId - board if type string
 * @returns all boards reassigned with boards except the one found by id in param
 */
const deleteBoard = async (id: string) => {
  const singleBoard = await getRepository(Board).findOne(id);
  if(singleBoard) {
    await getRepository(Task).delete({ boardId: id });
    await getRepository(Board).delete(id);
    return getAllBoards();
  }
  
    throw new Error('Board not found');
  
};

/**
 * update board details with data incoming in param by received id
 * @param  boardId  - board if type string
 * @param  updatedBoardData -  board if type INewBoard
 * reassigns allBoards with the boards where updated board has new details
 */

const updateBoard =  async (id: string, updatedData: IBoard) => {

  const boardRepository = getRepository(Board);

  const singleBoard = await boardRepository.findOne(id);
  if(singleBoard) {

  await boardRepository.update({ id }, updatedData);
   const allBoardsWzUpdated = await getAllBoards(); 
   return allBoardsWzUpdated;
  }
  
    throw new Error('Board not found');
};

export const boardsRepo = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
