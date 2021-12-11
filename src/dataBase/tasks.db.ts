import { ITask } from 'common/interfaces';

export const tasks: Array<ITask> = [
  {
    id: '1',
    title: 'Task1',
    order: 0,
    description: 'for QA check ticket BUG: card drag',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
  {
    id: '2',
    title: 'Task2',
    order: 1,
    description: 'to refactor sound controller',
    userId: '2',
    boardId: '1',
    columnId: '2',
  },
];
