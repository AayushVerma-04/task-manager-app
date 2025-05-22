const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const mongoose = require("mongoose");
const Task = require("../Models/taskModel");

const createToken = (_id) => {
  const secret = process.env.jwt_secret;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message : error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);

    return res
      .status(200)
      .json({ id: user._id, username: user.username, email, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.signup(username, email, password);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = createToken(user._id);
    res.status(201).json({ id: user._id, username, email, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tasks = user.tasks;
    res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username if provided
    if (username) {
      if (validator.isNumeric(username)) {
        return res.status(400).json({ message: "Username cannot be a number" });
      }
      user.username = username;
    }

    // Update password if provided
    if (password) {
      const validator = require("validator");
      const bcrypt = require("bcryptjs");

      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Password not strong enough" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user.password = hashed;
    }

    await user.save();

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    await Task.deleteMany({ _id: { $in: user.tasks } }, { session: sess });
    await user.deleteOne();

    await sess.commitTransaction();
    sess.endSession();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  login,
  signup,
  getUserTasks,
  updateUser,
  deleteUser,
};
