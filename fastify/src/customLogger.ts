import { TransportMultiOptions, LoggerOptions, Logger, pino } from 'pino';
import { config } from './common/config';
import { INFO, ERROR } from './common/constants';

const transport: LoggerOptions = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      level: ERROR,
      target: 'pino/file',
      options: {
        destination: './src/logs/errorLogs.json',
        mkdir: true,
        colorize: true,
        ignore: 'hostname, pid',
      },
    },
    {
      level: config.LOG_LEVEL || INFO,
      target: 'pino/file',
      options: {
        colorize: true,
        ignore: 'hostname, pid',
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
        destination: './src/logs/infoLogs.json',
        mkdir: true,
      },
    },
    { target: 'pino-pretty', colorize: true, ignore: 'hostname, pid' },
  ],
}) as LoggerOptions;

export const customLogger: Logger = pino(transport);
