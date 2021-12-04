const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'New title',
    description = '',
    order = 0,
    columnId = null,
    borderId = null,
    userId = null,
  } = {}) {
    this.id = id;
    this.order = order;
    this.columnId = columnId;
    this.title = title;
    this.borderId = borderId;
    this.description = description;
    this.userId = userId;
  }

  static createTask(task) {
    const { title, order, userId, columnId, borderId, description } = task;

    const newTask = {
      id: this.id,
      title,
      columnId,
      order,
      userId,
      borderId,
      description,
    };

    return new Task(newTask);
  }
}

module.exports = Task;
