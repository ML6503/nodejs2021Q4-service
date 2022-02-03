"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// const fastify = require('fastify')({ logger: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
const user_router_1 = require("./resources/users/user.router");
const customLogger_1 = require("./customLogger");
const config_1 = require("./common/config");
/**
 * const server get assigned with a Fastify factory function for the standard fastify http, https, or http2 server instance.
 * The default function utilizes http
 * @returns — Fastify server instance
 */
const server = (0, fastify_1.default)({
    genReqId: () => (0, uuid_1.v4)(),
    logger: 
    // {
    //   prettyPrint: {
    //     translateTime: true,
    //     ignore: 'pid, hostname,reqid,responseTime,req, res',
    //     // messageFormat: `{msg} [id={reqId} {req.method} {req.url}]`,
    //     messageFormat: `{msg} [id={reqId} {req.method} {req.url} {req.query}]`,
    //   },
    //  level: 'info',
    //   file: './src/logs/infoLogs.json',
    //}
    customLogger_1.customLogger,
    disableRequestLogging: true,
});
server.addHook('onRequest', (req, _reply, done) => {
    // req.id =  uuidv4(),
    req.log.info({
        method: req.method,
        url: req.raw.url,
        parameters: req.params,
        id: req.id,
    }, 'received request');
    done();
});
server.addHook('onResponse', (req, reply, done) => {
    req.log.info({
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
    }, 'request completed');
    done();
});
/**
 * library logger hook to add body to request log
 */
server.addHook('preHandler', function (req, _reply, next) {
    if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
    }
    next();
});
/**
 * register async function get server register with Fastify plugins
 * @remarks
 * FastifyPluginCallback<SwaggerOptions> - ready api.yaml documentation
 * and with app routes as FastifyInstance
 * userRoutes
 * boardRoutes
 * tasksRoutes
 *
 */
const register = async () => {
    await server.register(fastify_swagger_1.default, {
        exposeRoute: true,
        routePrefix: '/doc',
        mode: 'static',
        specification: {
            path: path_1.default.join(__dirname, '../doc/api.yaml'),
            baseDir: __dirname,
        },
    });
    await server.register(user_router_1.usersRoutes);
    await server.register(board_router_1.boardsRoutes);
    await server.register(task_router_1.tasksRoutes);
};
/**
 * starts Fastify server
 * that try server to connect if error then process.exit code = 1
 * and catch Error if any with server log error and process exit = 1
 *
 */
const start = async () => {
    await register();
    try {
        server.listen(config_1.config.PORT, '0.0.0.0', (err, address) => {
            if (err) {
                if (err instanceof Error) {
                    server.log.error(err);
                    process.exit(1);
                }
            }
            server.log.info(`Server listening at ${address}`);
            console.log(`Server listening at ${address}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            server.log.error(error);
            process.exit(1);
        }
    }
};
process.on('uncaughtException', (error) => server.log.error(error));
process.on('unhandledRejection', (error) => error instanceof Error && server.log.error(error));
void start();
