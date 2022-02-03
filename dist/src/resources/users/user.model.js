"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
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
