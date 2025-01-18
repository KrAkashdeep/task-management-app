const {
  createTask,
  fetchAllTask,
  updateTaskByID,
  deleteTaskByID,
} = require("../Controllers/TaskController");

const router = require("express").Router();

//to get all task
router.get("/", fetchAllTask);

//to create task
router.post("/", createTask);

//to update task
router.put("/:id", updateTaskByID);

//to delete task
router.delete("/:id", deleteTaskByID);

module.exports = router;
