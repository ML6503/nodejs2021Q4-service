import { FastifyLoggerInstance } from 'fastify/types/logger';
import pino from 'pino';
const transport = pino.transport({
    targets: [
        {
            level: 'info',
            target: '#pino/file',
            options: {
                destination: './logs/infoLogs.json'
            }
        }
    ]
});

export const customLogger : pino.Logger = pino(transport);

