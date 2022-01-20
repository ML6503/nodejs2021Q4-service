import { getRepository } from 'typeorm';
import { IBoard } from '../../common/interfaces';
// import { boards } from '../../dataBase/boards.db';
import Board from '../../entity/Board';

// let allBoards: Array<IBoard> | [] = [...boards];

/**
 * function to obtain all boards
 * @returns all boards type IBoard or empty array
 */
// const getAllBoards: () => IBoard[] = () => allBoards;
const getAllBoards = async () => {
 
  const allBoards = await getRepository(Board).find();
  return allBoards;
};
/**
 * func to add new board to all board
 * @param board - board type IBoard
 * reassign all boards with new board data
 */
// const addNewBoard = (board: IBoard) => {
//   allBoards = [...allBoards, board];
// };
const addNewBoard = async (boardDetails: IBoard) => {
  // allUsers = [...allUsers, user];
  const board= new Board();
  board.title = boardDetails.title;
  board.id = boardDetails.id;
  board.columns = boardDetails.columns;
  
  const addedBoard = await getRepository(Board).save(board);
  return addedBoard;
  
};
/**
 * finds user by its id
 * @param  boardId - board id type string
 * @returns user found from all users array by it id
 */
// const findBoard = (boardId: string) =>
//   allBoards.find((u: IBoard) => u.id === boardId);
const findBoard = async (id: string) => {
  // allUsers.find((u) => u.id === userId);
  const singleBoard = await getRepository(Board).findOne(id);
  return singleBoard;
};

/**
 * delete board by id
 * @param  boardId - board if type string
 * @returns all boards reassigned with boards except the one found by id in param
 */
// const deleteBoard = (boardId: string) => {
//   allBoards = allBoards.filter((u: IBoard) => u.id !== boardId);
// };
const deleteBoard = async (id: string) => {
  const singleBoard = await getRepository(Board).findOne(id);
  if(singleBoard) {
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
// const updateBoard = (boardId: string, updatedBoardData: INewBoard) => {
//   const newBoard = { id: boardId, ...updatedBoardData };
//   allBoards = allBoards.map((board: IBoard) =>
//     board.id === boardId ? newBoard : board
//   );
// };

const updateBoard =  async (id: string, updatedData: IBoard) => {

  const userRepository = getRepository(Board);

  const singleBoard = await userRepository.findOne(id);
  if(singleBoard) {
    const updatedBoard = userRepository.merge(singleBoard, updatedData);
   
   const results = await userRepository.save(updatedBoard); 
   return results;
  }
  
    else throw new Error('Board not found');
};

export const boardsRepo = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
