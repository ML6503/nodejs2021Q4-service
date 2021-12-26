import pino, { LoggerOptions } from 'pino';
import { config } from '../common/config';
import { INFO, ERROR } from '../common/constants';

// const transport: Props = pino.transport(<TransportMultiOptions>{

const customLogger = pino(<LoggerOptions>{
  transport: {
    targets: [
      {
        level: ERROR,
        // target: 'pino/file',
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'hostname, pid',
          translateTime: 'yyyy-dd-mm, h:MM:ss TT',
          destination: './src/logs/errorLogs.json',
          mkdir: true,
        },
      },
      {
        level: config.LOG_LEVEL || INFO,
        // target: 'pino/file',
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'hostname, pid',
          translateTime: 'yyyy-dd-mm, h:MM:ss TT',
          destination: './src/logs/infoLogs.json',
          mkdir: true,
        },
      },
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'hostname, pid',
          translateTime: 'yyyy-dd-mm, h:MM:ss TT',
        },
      },
    ],
  },
});

export default customLogger;
// export const customLogger: Logger = pino(transport);
