"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
const pino_1 = require("pino");
const config_1 = require("./common/config");
const constants_1 = require("./common/constants");
const transport = pino_1.pino.transport({
    targets: [
        {
            level: constants_1.ERROR,
            target: 'pino/file',
            options: {
                destination: './src/logs/errorLogs.json',
                mkdir: true,
                colorize: true,
                ignore: 'hostname, pid',
            },
        },
        {
            level: config_1.config.LOG_LEVEL || constants_1.INFO,
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
});
exports.customLogger = (0, pino_1.pino)(transport);
