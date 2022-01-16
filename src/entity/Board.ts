import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { INewBoard } from '../common/interfaces';

/**
 * constructs Board Entity for typeorm
 * @param title - title the board
 * @param columnsId - ids of columns in this board
 * * @param tasksId - ids of tasks in this board
 */

@Entity()
export default class Board extends BaseEntity {
  constructor(board: INewBoard) {
    super();
    const { title, columnsId, tasksId } = board;
    this.id = uuidv4();
    this.title = title;
    this.columnsId = columnsId && columnsId.length !== 0 ? columnsId : [];
    this.tasksId = tasksId && tasksId.length !== 0 ? tasksId : [];
  }

  @Column()
  title: string | undefined;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  columnsId: Array<string> | [];

  @Column()
  tasksId: Array<string> | [];
}
