const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const getCurrentTasks = async (req, res) => {
  const user = req.user;

  try {
    const tasks = await Task.find({ creator: user, isDeleted: false }).sort({ deadline: 1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

const getAllTasks = async (req,res) =>{
  const user = req.user;

  try {
    const tasks = await Task.find({creator: user});
    res.status(200).json({tasks})
  } catch (error) {
    res.status(400).json({mesage : error.message});
  }
}

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  const userId = req.user._id;
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ message: "Both fields required" });
  }

  const newTask = new Task({
    title,
    deadline: new Date(deadline),
    isCompleted: false,
    creator: userId,
  });

  try {
    const creator = await User.findById(userId);
    if (!creator) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await newTask.save({ session: sess });
    creator.tasks.push(newTask);
    await creator.save({ session: sess });

    await sess.commitTransaction();
    sess.endSession();

    res.status(201).json({ newTask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (request, response) => {
  const { title, deadline } = request.body;

  if (!title || !deadline) {
    return response.status(400).json({
      message: "Send all required fields",
    });
  }

  const { taskId } = request.params;

  try {
    const result = await Task.findByIdAndUpdate(
      taskId,
      { title, deadline },
      { new: true }
    );

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response
      .status(200)
      .json({ message: "Task updated successfully", data: result });
  } catch (error) {
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

    task.isCompleted = !task.isCompleted;
    task.completedAt = task.isCompleted ? new Date() : null;
    await task.save();

    response.status(200).json({ task });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// const deleteById = async (req, res) => {
//   const userId = req.user._id;
//   const {taskId} = req.params;

//   try {
//     const creator = await User.findById(userId);
//     if (!creator) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task does not exist" });
//     }

//     const sess = await mongoose.startSession();
//     sess.startTransaction();

//     creator.tasks.pull(task._id);
//     await creator.save({ session: sess });
//     await task.deleteOne({session: sess});

//     await sess.commitTransaction();
//     sess.endSession();

//     res.status(200).json({ message : 'Task deleted' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const deleteById = async (req,res) =>{
  const {taskId} = req.params;
  try {
    const task = await Task.findById(taskId);

    if(!task){
      return res.status(404).json({message: 'Task not found'});
    }

    task.isDeleted = true;
    await task.save();

    return res.status(200).json({message :"Task deleted"})
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

module.exports = { getCurrentTasks, getAllTasks, addTask, getTaskById, updateTask, markTaskCompleted, deleteById };
