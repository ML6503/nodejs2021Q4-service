import { FastifyLoggerOptions } from 'fastify/types/logger';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn> | [];
}

export interface INewBoard {
  title: string;
  columns: Array<IColumn> | [];
}

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

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface IGetTaskParam {
  taskId: string;
}

