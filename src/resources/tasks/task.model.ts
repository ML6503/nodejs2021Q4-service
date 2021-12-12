import { v4 as uuidv4 } from 'uuid';
import { ITask } from 'common/interfaces';

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
    } = task;
    this.id = uuidv4();
    this.order = order;
    this.columnId = columnId;
    this.title = title;
    this.boardId = boardId;
    this.description = description;
    this.userId = userId;
  }
}
