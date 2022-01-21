import { IBoard, IColumn, ITask } from '../../common/interfaces';

/**
 * constructs Board from params details and adding generated uuid
 * @param title - naming the board
 * @param columns - of this board
 */
export default class Board {
  title: string | undefined;

  id: string | undefined;

  columns: Array<IColumn> | [];

  tasks: Array<ITask> | [] | undefined;

  constructor(board: IBoard) {
    const { title, columns, tasks, id } = board;
    this.id = id;
    this.title = title;
    this.columns = columns && columns.length !== 0 ? columns: [];
    this.tasks = tasks && tasks.length !== 0 ? tasks : [];
  }
}
