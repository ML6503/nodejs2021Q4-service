import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Task from './task.entity';
import User from './user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreatedTaskDto } from 'src/resources/dto/create-task.dto';

/**
 * constructs Board Entity for typeorm
 * @param title - title the board
 * @param columns- array of columns of this board
 * @param tasksId - ids of tasks of this board
 */

@Entity({ name: 'boards' })
export default class Board extends BaseEntity {
  // constructor() {
  //   super();
  //   this.id = uuidv4();
  //   this.title = '';
  //   this.columns = [];
  // }

  @Column('varchar', { length: 100 })
  title: string | undefined;

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined | null;

  @ApiProperty({
    example: [],
    description: 'list of all tasks',
  })
  @Column({
    type: 'jsonb',
    nullable: false,
    array: false,
    default: () => "'[]'",
  })
  columns: Array<{ id: string; order: number; title: string }>;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.board, { onDelete: 'CASCADE' })
  task: Task | undefined;

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.board)
  @JoinColumn()
  user: User | undefined;
}
