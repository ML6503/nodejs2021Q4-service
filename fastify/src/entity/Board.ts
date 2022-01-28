import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Task from './Task';
import User from './User';

/**
 * constructs Board Entity for typeorm
 * @param title - title the board
 * @param columns- array of columns of this board
 * * @param tasksId - ids of tasks of this board
 */

@Entity({ name: 'boards' })
export default class Board extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
    this.title = '';
    this.columns = [];
  }

  @Column('varchar', { length: 100 })
  title: string | undefined;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column( { 
    type: 'jsonb',
    nullable: false,
    array: false,
    default: () => "'[]'", })
  columns: Array<{ id: string; order: number; title: string }>;

  @OneToMany(() => Task, (task) => task.board, { onDelete: 'CASCADE' })
  task: Task | undefined;

  @OneToMany(() => User, (user) => user.board)
  @JoinColumn()
  user: User | undefined;
}
