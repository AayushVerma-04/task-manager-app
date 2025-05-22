const express = require("express");
const {
  login,
  signup,
  getUserTasks,
  getUsers,
  updateUser,
  deleteUser,
  getUser
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.put("/:userId", updateUser);
userRouter.get("/:userId/tasks", getUserTasks);
userRouter.delete('/:userId',deleteUser);

module.exports = userRouter;
