import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiHideProperty } from '@nestjs/swagger';
import Board from './board.entity';
import Task from './task.entity';
import { config } from '../common/config';

const SAULT_ROUND = +config.SAULT_ROUND;
const toBcryptHash: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value && bcrypt.hashSync(value, SAULT_ROUND),
};

/**
 * constructs User from params details and adding generated uuid
 * @param name - user's name
 * @param login - user's login
 * @param password - user's password
 */
@Entity({ name: 'users' })
export default class User extends BaseEntity {
  // constructor() {
  //   super();
  //   this.name = '';
  //   this.id = uuidv4();
  //   this.login = '';
  //   this.password = '';
  // }

  @Column('varchar', { nullable: true })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  login: string;

  @ApiHideProperty()
  @Column({ transformer: toBcryptHash })
  // @Exclude({ toPlainOnly: true })
  // @Column('varchar')
  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, SAULT_ROUND)
  // }
  password: string;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.user)
  board: Board | undefined;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  task: Task | undefined | null;
}
