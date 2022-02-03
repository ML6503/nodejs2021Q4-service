"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./constants");
// import * as path from 'path';
/* dotenv.config({
  path: path.join(__dirname, '../../.env'),
}); */
dotenv_1.default.config();
// module.exports = {
exports.config = {
    PORT: process.env.PORT ? process.env.PORT : 4000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    AUTH_MODE: process.env.AUTH_MODE === constants_1.TRUE,
    LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : constants_1.DEBUG,
};
