import { IBoard, INewBoard } from '../../common/interfaces';
import { boards } from '../../dataBase/boards.db';

let allBoards: Array<IBoard> | [] = [...boards];
const getAllBoards: () => IBoard[] = () => allBoards;

const addNewBoard = (board: IBoard) => {
  allBoards = [...allBoards, board];
};

const findBoard = (boardId: string) =>
  allBoards.find((u: IBoard) => u.id === boardId);

const deleteBoard = (boardId: string) => {
  allBoards = allBoards.filter((u: IBoard) => u.id !== boardId);
};

const updateBoard = (boardId: string, updatedBoardData: INewBoard) => {
  const newBoard = { id: boardId, ...updatedBoardData };
  allBoards = allBoards.map((board: IBoard) =>
    board.id === boardId ? newBoard : board
  );
};

module.exports = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};
