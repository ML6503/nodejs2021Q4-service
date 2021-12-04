const boardsService = require('./board.service');
const Board = require('./board.model');

const boards = boardsService.getAllBoards;
const { addNewBoard, findBoard, deleteBoardById, updateBoardById } =
  boardsService;

const getBoards = async (req, reply) => {
  await boards();
  reply.send(boards());
};

const getBoard = async (req, reply) => {
  const { boardId } = req.params;
  const board = await findBoard(boardId);
  reply.send(board);
};

const addBoard = async (req, reply) => {
  const newBoardData = req.body;
  const newBoard = Board.createBoard(newBoardData);
  await addNewBoard({ ...newBoard });
  reply.code(201).send({ ...newBoard });
};

const deleteBoard = async (req, reply) => {
  const { boardId } = req.params;

  await deleteBoardById(boardId);
  reply.send({ message: `The board ${boardId} has been deleted` });
};

const updateBoard = async (req, reply) => {
  const { boardId } = req.params;
  const updatedBoardData = req.body;

  await updateBoardById(boardId, updatedBoardData);

  const board = await findBoard(boardId);
  reply.send(board);
};

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
