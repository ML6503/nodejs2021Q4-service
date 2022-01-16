import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

/**
 * constructs User from params details and adding generated uuid
 * @param name - user's name
 * @param login - user's login
 * @param password - user's password
 */
@Entity()
export default class User extends BaseEntity {
  constructor() {
    super();
    this.name = '';
    this.id = uuidv4();
    this.login = '';
    this.password = '';
  }

  @Column('varchar', { length: 100 })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  login: string;

  @Column('varchar', { length: 100 })
  password: string;
}
