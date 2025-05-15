import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const addTask = async (request, response) => {
  const user_id = request.user._id;
  const { title, deadline } = request.body;

  if (!title || !deadline) {
    return response.status(400).json({
      message: "Send all required fields",
    });
  }

  const newTask = new Task({
    title,
    deadline,
    user: user_id
  });

  try {
    const creator = await User.findById(user_id);
    if (!creator) {
      return response.status(404).json({ message: "User does not exist" });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await newTask.save({ session: sess });
    creator.tasks.push(newTask);
    await creator.save({ session: sess });

    await sess.commitTransaction();
    sess.endSession();

    return response.status(201).json(newTask);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};

const getTasks = async (request, response) => {
  try {
    const user_id = request.user._id;
    const tasks = await Task.find({ user: user_id });

    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};

const updateTask = async (request, response) => {
  try {
    const { title, deadline } = request.body;

    if (!title || !deadline) {
      return response.status(400).json({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response
      .status(200)
      .json({ message: "Task updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};

const markTaskCompleted = async (request, response) => {
  const { taskId } = request.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    task.completed = true;
    await task.save();

    response.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  try {
    const task = await Task.findById(id).populate("user");
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    task.user.tasks.pull(task);
    await task.user.save({ session: sess });
    await task.deleteOne({ session: sess });

    await sess.commitTransaction();
    sess.endSession();

    return response.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Error deleting task" });
  }
};

export {
  addTask,
  getTasks,
  updateTask,
  markTaskCompleted,
  deleteTask
};
