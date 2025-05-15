import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  addTask,
  deleteTask,
  getTasks,
  markTaskCompleted,
  updateTask,
} from "../controllers/taskController.js";

const tasksRouter = express.Router();

// Protect all routes with auth middleware
tasksRouter.use(requireAuth);

// Create a new task
tasksRouter.post("/", addTask);

// Get all tasks for the logged-in user
tasksRouter.get("/", getTasks);

// Update a task by ID
tasksRouter.put("/:id", updateTask);

// Delete a task by ID
tasksRouter.delete("/:id", deleteTask);

// Mark a task as completed
tasksRouter.put("/complete/:taskId", markTaskCompleted);

export default tasksRouter;
