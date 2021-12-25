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
        destination: './src/logs/infoLogs.json',
        mkdir: true,
        colorize: true,
        ignore: 'hostname, pid',
      },
    },
    { target: 'pino-pretty', colorize: true, ignore: 'hostname, pid' },
  ],
});

export const customLogger: Logger = pino(transport);
