const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TaskSchema = new schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const taskModel = mongoose.model("todos", TaskSchema);

module.exports = taskModel;
