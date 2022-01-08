import { IBoard } from '../src/common/interfaces';

export const boards: Array<IBoard> = [
  {
    id: '1',
    title: 'New App Game',
    columns: [
      {
        id: '1',
        title: 'Sprint 8 in progress',
        order: 0,
      },
      {
        id: '2',
        title: 'Sprint 7 backlog',
        order: 1,
      },
    ],
  },
  {
    id: '2',
    title: 'Old App',
    columns: [
      {
        id: '1',
        title: 'Done',
        order: 0,
      },
    ],
  },
];
