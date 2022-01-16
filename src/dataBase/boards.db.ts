import { IBoard } from '../common/interfaces';

export const boards: Array<IBoard> = [
  {
    id: '1',
    title: 'New App Game',
    columnsId: ['1', '2'],
    tasks: [
      {
        id: '1',
        title: 'Sprint 8 in progress',
        order: 0,
        columnId: '1',
        boardId: '1',
        userId: 'ad-cdfdUO90',
        description: 'blablabla',
      },
      {
        id: '2',
        title: 'Sprint 7 backlog',
        order: 1,
        columnId: '2',
        boardId: '1',
        userId: 'ad-cdfdUO90',
        description: 'blablabla',
      },
    ],
  },
  {
    id: '2',
    title: 'Old App',
    tasks: [
      {
        id: '1',
        title: 'Sprint 8 in progress',
        order: 0,
        columnId: '1',
        boardId: '2',
        userId: 'ad-cdfdUO90',
        description: 'lalalala',
      },
    ],

    columnsId: ['1', '2'],
  },
];
