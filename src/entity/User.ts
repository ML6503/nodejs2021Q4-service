import { v4 as uuidv4 } from 'uuid';
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
import Board from './Board';
import Task from './Task';
// import { SAULT_ROUND } from '../common/constants';

const { SAULT_ROUND } = process.env;
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
  constructor() {
    super();
    this.name = '';
    this.id = uuidv4();
    this.login = '';
    this.password = '';
  }

  @Column('varchar')
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  login: string;

  @Column({ transformer: toBcryptHash })
  // @Column('varchar')
  password: string;

  @ManyToOne(() => Board, (board) => board.user)
  board: Board | undefined;

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'SET NULL' })
  task: Task | undefined | null;
}
