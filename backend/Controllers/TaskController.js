const TaskModel = require("../Models/TaskModel");

//to create
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: "Task is created ", success: true });
  } catch (err) {
    res.status(500).json({ message: " failed to create task", success: false });
  }
};

//to get task
const fetchAllTask = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Task", success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ message: " failed to get all task", success: false });
  }
};

//to update
const updateTaskByID = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task updated", success: true });
  } catch (err) {
    res.status(500).json({ message: " failed to update task", success: false });
  }
};

//to delete task
const deleteTaskByID = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is delete", success: true });
  } catch (err) {
    res.status(500).json({ message: " failed to delete task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTask,
  updateTaskByID,
  deleteTaskByID,
};
