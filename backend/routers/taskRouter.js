const express = require("express");
const {
  addTask,
  getTaskById,
  updateTask,
  markTaskCompleted,
  deleteById,
  getAllTasks,
  getCurrentTasks,
} = require("../controllers/taskController");
const requireAuth = require("../middlewares/requireAuth");

const taskRouter = express.Router();

taskRouter.use(requireAuth);

taskRouter.get("/", getCurrentTasks);
taskRouter.get("/history", getAllTasks);
taskRouter.post("/", addTask);
taskRouter.get("/:taskId", getTaskById);
taskRouter.put("/:taskId", updateTask);
taskRouter.put("/complete/:taskId", markTaskCompleted);
taskRouter.delete("/:taskId", deleteById);

module.exports = taskRouter;
