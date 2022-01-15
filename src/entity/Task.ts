import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ITask } from '../common/interfaces';

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
export default class Task {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  order: number;

  @Column()
  columnId: string | null;

  @Column()
  boardId: string;

  @Column()
  userId: string | null;

  @PrimaryGeneratedColumn('uuid')
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
