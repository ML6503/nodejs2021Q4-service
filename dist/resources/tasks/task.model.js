"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * constructs Board Task from params details and adding generated uuid
 * @param title - naming task
 * @param description - of this task
 * @param order - that task will appear in column
 * @param columnId - id of the column that task belongs
 * @param boardId - id of the board that task belongs
 * @param userId - id of the user created task
*/
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
