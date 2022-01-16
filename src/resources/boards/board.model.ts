import { v4 as uuidv4 } from 'uuid';
import { INewBoard } from '../../common/interfaces';

/**
 * constructs Board from params details and adding generated uuid
 * @param title - naming the board
 * @param columns - of this board
 */
export default class Board {
  title: string;

  id: string;

  columnsId: Array<string> | [];

  tasksId: Array<string> | [];

  constructor(board: INewBoard) {
    const { title, columnsId, tasksId } = board;
    this.id = uuidv4();
    this.title = title;
    this.columnsId = columnsId && columnsId.length !== 0 ? columnsId : [];
    this.tasksId = tasksId && tasksId.length !== 0 ? tasksId : [];
  }
}
