
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
  // params: IGetBoardParam;
  Body: INewBoard;
}

