"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
// const fastify = require('fastify')({ logger: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const config_1 = require("./common/config");
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
const user_router_1 = require("./resources/users/user.router");
const server = (0, fastify_1.default)();
server.register(fastify_swagger_1.default, {
    exposeRoute: true,
    routePrefix: '/doc',
    mode: 'static',
    specification: {
        path: path.join(__dirname, '../doc/api.yaml'),
        baseDir: './doc',
    },
});
server.register(user_router_1.usersRoutes);
server.register(board_router_1.boardsRoutes);
server.register(task_router_1.tasksRoutes);
const start = () => {
    try {
        server.listen(config_1.config.PORT, (err, address) => {
            if (err) {
                err instanceof Error && console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    }
    catch (error) {
        error instanceof Error && server.log.error(error);
        process.exit(1);
    }
};
process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledRejection', (error) => error instanceof Error && console.error(error));
start();
