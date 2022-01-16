import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import User from './User';
import { ITask } from '../common/interfaces';
import Board from './Board';

/**
 * constructs Board Task entity from params details and adding generated uuid
 * @param title - naming task
 * @param description - of this task
 * @param order - that task will appear in column
 * @param columnId - id of the column that task belongs
 * @param boardId - id of the board that task belongs
 * @param userId - id of the user created task
 */

@Entity()
export default class Task extends BaseEntity {
  constructor(task: ITask) {
    super();
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

  @Column()
  title: string;

  @Column('text')
  description: string;

  @PrimaryGeneratedColumn()
  order: number;

  @Column('varchar', { length: 100 })
  columnId: string | null;

  @ManyToOne(() => Board, (board) => board.tasksId, { onDelete: 'CASCADE' })
  @Column('varchar', { length: 100 })
  boardId: string;

  @ManyToOne(() => User, (user) => user.id)
  @Column('varchar', { length: 100, nullable: true })
  userId: string | null;

  @Column('uuid')
  id: string;
}
