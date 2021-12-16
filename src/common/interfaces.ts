/**
 * @interface IColumn
 * used in @class Board
 */
export interface IColumn {
  /**
   * interface property description
   * @member {string} id optional as if new Column is got assigned
   * @member {string} title required column title
   * @member {number} order of the column
   */
  id?: string;
  title: string;
  order: number;
}

/**
 * @interface IBoard
 * @class Board
 */
export interface IBoard {
  /**
   * interface property description
   * @member {string} id required board id
   * @member {string} title required board title
   * @member {Array<IColumn> | []} columns of the board
   */
  id: string;
  title: string;
  columns: Array<IColumn> | [];
}

/**
 * @interface INewBoard
 * @class Board
 */
export interface INewBoard {
  /**
   * interface property description
   * @member {string} title required board title
   * @member {Array<IColumn> | []} columns of the board
   */
  title: string;
  columns: Array<IColumn> | [];
}

/**
 * @interface IGetBoardParam
 */
export interface IGetBoardParam {
  /**
   * interface property description
   * @member {string} id required board id
   */
  boardId: string;
}

/**
 * @interface IRequestAddBoard
 */
export interface IRequestAddBoard {
  /**
   * interface property description
   * @member {INewBoard} Body required board details
   */
  Body: INewBoard;
}

/**
 * @interface IColumn
 * @class User
 */
export interface IUser {
  /**
   * interface property description
   * @member {string} id optional as if new User it is to get assigned
   * @member {string} name required user name
   * @member {string} login of the user
   * @member {string} password of the user
   */
  id?: string;
  name: string;
  login: string;
  password: string;
}

/**
 * @interface IGetUserParam
 */
export interface IGetUserParam {
  /**
   * interface property description
   * @member {string} userId
   */
  userId: string;
}

/**
 * @interface ITask
 * @class Task
 */
export interface ITask {
  /**
   * interface property description
   * @member {string} id optional as if new Task it is to get assigned
   * @member {string} title required for a task
   * @member {string} description of the task, required
   * @member {string} userId required id of the user of the task
   * @member {string} boardId required board id where task is placed
   * @member {string} columnID required column id where taks is placed
   * @member {number} order required for task to be placed at column
   */
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

/**
 * @interface IGetTaskParam
 */
export interface IGetTaskParam {
   /**
   * interface property description
   * @member {string} taskId
   */
  taskId: string;
}
