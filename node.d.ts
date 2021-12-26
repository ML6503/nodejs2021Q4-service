import { LoggerOptions, Logger, DestinationStream } from 'pino';

interface ImportMeta {
  __dirname: string;
}

declare namespace NodeJS {
  interface Process {
    env: { [key: string]: string };
  }
}

declare function pino(
  optionsOrStream?: LoggerOptions | DestinationStream
): Logger;

declare function pino(
  options: LoggerOptions,
  stream: DestinationStream
): Logger;
