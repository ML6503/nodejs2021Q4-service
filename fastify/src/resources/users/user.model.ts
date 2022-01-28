import { IUser } from '../../common/interfaces';

/**
 * constructs User from params details and adding generated uuid
 * @param name - user's name
 * @param login - user's login
 * @param password - user's password  
*/
export default class User {
  name: string;

  id: string | undefined;

  login: string;

  password: string;

  constructor(user: IUser) {
    const { name, login, password, id } = user;
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
