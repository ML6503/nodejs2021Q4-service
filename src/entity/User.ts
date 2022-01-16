import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IUser } from '../common/interfaces';

/**
 * constructs User from params details and adding generated uuid
 * @param name - user's name
 * @param login - user's login
 * @param password - user's password
 */
@Entity()
export default class User extends BaseEntity {
  constructor(user: IUser) {
    super();
    const { name, login, password } = user;
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  @Column()
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
