import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../common/interfaces';

export default class User {
  name: string;
  id: string;
  login: string;
  password: string;

  constructor(user: IUser) {
    const { name, login, password } = user;
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
