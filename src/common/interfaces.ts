import { RequestGenericInterface } from 'fastify';

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

export interface IRequestBoard extends RequestGenericInterface {
  params: {
    boardId: string;
  };
  body: INewBoard;
}
