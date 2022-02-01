import * as dotenv from 'dotenv';
import { DEBUG, TRUE } from './constants';

dotenv.config({ path: __dirname + '/.env' });

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV,
  SAULT_ROUND: +process.env.SAULT_ROUND,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '',
  AUTH_MODE: process.env.AUTH_MODE === TRUE,
  LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : DEBUG,
  USE_FASTIFY: process.env.USE_FASTIFY,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: +process.env.POSTGRES_PORT || 5432,
};
