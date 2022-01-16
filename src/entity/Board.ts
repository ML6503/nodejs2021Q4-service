import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import Task from './Task';

/**
 * constructs Board Entity for typeorm
 * @param title - title the board
 * @param columnsId - ids of columns in this board
 * * @param tasksId - ids of tasks in this board
 */

@Entity()
export default class Board extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
    this.title = '';
    this.columnsId = [];
  }

  @Column('varchar', { length: 100 })
  title: string | undefined;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', { length: 100 })
  columnsId: Array<string> | [];

  @ManyToOne(() => Task, (task) => task.board, { onDelete: 'CASCADE' })
  tasks: Task[] | undefined;
}
