import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../common/interfaces';

/**
 * constructs Board Task from params details and adding generated uuid
 * @param title - naming task
 * @param description - of this task
 * @param order - that task will appear in column
 * @param columnId - id of the column that task belongs
 * @param boardId - id of the board that task belongs
 * @param userId - id of the user created task
*/
export default class Task {
  title: string;

  description: string;

  order: number;

  columnId: string | null;

  boardId: string;

  userId: string | null;

  id: string;

  constructor(task: ITask) {
    const {
      title = 'New title',
      description = '',
      order = 0,
      columnId = null,
      boardId,
      userId = null,
      id = ''
    } = task;
    this.id = id;
    this.order = order;
    this.columnId = columnId;
    this.title = title;
    this.boardId = boardId;
    this.description = description;
    this.userId = userId;
  }
}
