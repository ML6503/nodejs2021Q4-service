import { v4 as uuidv4 } from 'uuid';
import { IColumn, INewBoard } from '../../common/interfaces';

/**
 * constructs Board from params details and adding generated uuid
 * @param title - naming the board
 * @param columns - of this board 
*/
export default class Board {
  title: string;

  id: string;

  columns: Array<IColumn> | [];

  constructor(board: INewBoard) {
    const { title, columns } = board;
    this.id = uuidv4();
    this.title = title;
    this.columns = columns && columns.length !== 0 ? columns : [];
  }
}
