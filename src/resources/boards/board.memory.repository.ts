import { IBoard, INewBoard } from '../../common/interfaces';
import { boards } from '../../dataBase/boards.db';

let allBoards: Array<IBoard> | [] = [...boards];

/**
 * function to obtain all boards
 * @returns all boards @type IBoard or empty array
 */
const getAllBoards: () => IBoard[] = () => allBoards;

/**
 * func to add new board to all board
 * @param  {IBoard} board
 * reassign all boards with new board data
 */
const addNewBoard = (board: IBoard) => {
  allBoards = [...allBoards, board];
};

/**
 * finds user by its id
 * @param  {string} boardId
 * @returns user found from all users array by it id 
 */
const findBoard = (boardId: string) =>
  allBoards.find((u: IBoard) => u.id === boardId);

  
/**
 * delete board by id
 * @param  {string} boardId
 * @returns all boards reassigned with boards except the one found by id in param
 */
const deleteBoard = (boardId: string) => {
  allBoards = allBoards.filter((u: IBoard) => u.id !== boardId);
};

/**
 * update board details with data incoming in param by received id
 * @param  {string} boardId
 * @param  {INewBoard} updatedBoardData
 * reassigns allBoards with the boards where updated board has new details
 */
const updateBoard = (boardId: string, updatedBoardData: INewBoard) => {
  const newBoard = { id: boardId, ...updatedBoardData };
  allBoards = allBoards.map((board: IBoard) =>
    board.id === boardId ? newBoard : board
  );
};

export const boardsRepo = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
