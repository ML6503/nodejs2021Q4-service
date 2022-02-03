"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Task {
    constructor(task) {
        const { title = 'New title', description = '', order = 0, columnId = null, boardId, userId = null, } = task;
        this.id = (0, uuid_1.v4)();
        this.order = order;
        this.columnId = columnId;
        this.title = title;
        this.boardId = boardId;
        this.description = description;
        this.userId = userId;
    }
}
exports.default = Task;
