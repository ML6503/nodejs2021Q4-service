import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from 'typeorm';
import bcrypt from 'bcryptjs';
// import { Exclude } from 'class-transformer';
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

  @Column({ transformer: toBcryptHash })
  // @Exclude({ toPlainOnly: true })
  // @Column('varchar')
  password: string;

  @ManyToOne(() => Board, (board) => board.user)
  board: Board | undefined;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  task: Task | undefined | null;
}
