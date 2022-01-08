import dotenv from 'dotenv';
import { DEBUG, TRUE } from './constants';
// import * as path from 'path';

/* dotenv.config({
  path: path.join(__dirname, '../../.env'),
}); */

dotenv.config();

// module.exports = {
export const config = {
  PORT: process.env.PORT ? process.env.PORT : 4000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === TRUE,
  LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : DEBUG,
};
