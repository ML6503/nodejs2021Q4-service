export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
  board?: {
    id: string;
    title: string;
    columnsId: Array<string> | [];
    tasks: Array<ITask> | [];
  };
}

export interface IGetTaskParam {
  taskId: string;
}

export interface IGetColumnParam {
  taskId: string;
}

export interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn> | [];
  tasks?: Array<ITask> | [];
}

// export interface INewBoard {
//   title: string;
//   columns: Array<IColumn> | [];
//   tasks?: Array<ITask> | [];
// }

export type INewBoard = Omit<IBoard, 'id'>;
export interface IGetBoardParam {
  boardId: string;
}

export interface IRequestAddBoard {
  Body: INewBoard;
}

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

export interface IGetUserParam {
  userId: string;
}
