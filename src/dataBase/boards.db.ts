import { IBoard } from '../common/interfaces';

export const boards: Array<IBoard> = [
  {
    id: '1',
    title: 'New App Game',
    columnsId: ['1', '2'],
    tasksId: ['1', '2'],
  },
  {
    id: '2',
    title: 'Old App',
    columnsId: ['1'],
    tasksId: ['1', '2', '5'],
  },
];
