import { v4 as uuidv4 } from 'uuid';
import { INewBoard, ITask } from '../../common/interfaces';

/**
 * constructs Board from params details and adding generated uuid
 * @param title - naming the board
 * @param columns - of this board
 */
export default class Board {
  title: string;

  id: string;

  columnsId: Array<string> | [];

  tasks: Array<ITask> | [] | undefined;

  constructor(board: INewBoard) {
    const { title, columnsId, tasks } = board;
    this.id = uuidv4();
    this.title = title;
    this.columnsId = columnsId && columnsId.length !== 0 ? columnsId : [];
    this.tasks = tasks && tasks.length !== 0 ? tasks : [];
  }
}
