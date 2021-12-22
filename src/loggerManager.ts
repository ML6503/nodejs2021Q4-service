// @flow
import { FastifyLoggerOptions } from 'fastify';
import pino from 'pino';
import type { LoggerI } from '../common/interfaces';
import { config } from '../common/config';

export default class Logger implements LoggerI {
  requestId: string;
  pino: pino.BaseLogger;

  constructor(requestId: string) {
    this.requestId = requestId;
    this.pino = pino({
      level: config.LOG_LEVEL || 'debug',
    });
  }

  debug(arg: FastifyLoggerOptions): void {
    this.pino.debug({
      requestId: this.requestId,
      ...arg,
    });
  }

  info(arg: FastifyLoggerOptions): void {
    this.pino.info({
      requestId: this.requestId,
      ...arg,
    });
  }

  warn(arg: FastifyLoggerOptions): void {
    this.pino.warn({
      requestId: this.requestId,
      ...arg,
    });
  }

  error(arg: FastifyLoggerOptions): void {
    this.pino.error({
      requestId: this.requestId,
      ...arg,
    });
  }
}

// https://github.com/shashanktomar/serverless-webpack-babel-boilerplate/blob/1d483a2deb254b5b3ff03cd11951362154ec63f9/src/logger.js#L13
