import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import Board from './board.entity';
import { ApiHideProperty } from '@nestjs/swagger';

/**
 * Creates Board Task entity from params details and adding generated uuid
 * @param title - naming task
 * @param description - of this task
 * @param order - that task will appear in column
 * @param columnId - id of the column that task belongs
 * @param boardId - id of the board that task belongs
 * @param userId - id of the user created task
 */

@Entity({ name: 'tasks' })
export default class Task extends BaseEntity {
  @Column('varchar', { length: 100 })
  title?: string;

  @Column('text')
  description: string;

  @Column('integer')
  order: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  columnId: string | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  boardId: string;

  @Column('varchar', { nullable: true, name: 'user_id' })
  userId: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.task)
  board: Board | undefined;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.task, { onDelete: 'SET NULL' })
  user: User | undefined | null;
}
