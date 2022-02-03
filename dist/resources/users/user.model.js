"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * constructs User from params details and adding generated uuid
 * @param name - user's name
 * @param login - user's login
 * @param password - user's password
*/
class User {
    constructor(user) {
        const { name, login, password } = user;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.login = login;
        this.password = password;
    }
}
exports.default = User;
