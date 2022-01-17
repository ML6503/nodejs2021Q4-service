import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import User from './User';
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

@Entity({ name: 'tasks' })
export default class Task extends BaseEntity {
  constructor() {
    super();
    this.id = uuidv4();
    this.order = 0;
    this.columnId = '';
    this.title = '';
    this.boardId = '';
    this.description = '';
    this.userId = null;
  }

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text')
  description: string;

  @PrimaryGeneratedColumn()
  order: number;

  @Column('varchar', { length: 100, name: 'column_id' })
  columnId: string | null;

  @Column('varchar', { length: 100, name: 'board_id' })
  boardId: string;

  @ManyToOne((_type) => User, (user) => user.id, { onDelete: 'SET NULL' })
  @Column('varchar', { length: 100, nullable: true, name: 'user_id' })
  userId: string | null;

  @Column('uuid')
  id: string;

  @OneToOne((_type) => Board, (board) => board.tasks)
  board: Board | undefined;
}
