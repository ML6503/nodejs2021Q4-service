"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * constructs Board from params details and adding generated uuid
 * @param title - naming the board
 * @param columns - of this board
*/
class Board {
    constructor(board) {
        const { title, columns } = board;
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.columns = columns && columns.length !== 0 ? columns : [];
    }
}
exports.default = Board;
