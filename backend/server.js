const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const dotenv = require("dotenv");
const cron = require("node-cron");
const Task = require("./Models/taskModel");
dotenv.config();

const mongodbURL = process.env.mongodbURL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

cron.schedule('0 0 * * *', async () => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

  try {
    const result = await Task.deleteMany({ createdAt: { $lt: oneWeekAgo } });
    console.log(`Deleted ${result.deletedCount} tasks older than a week.`);
  } catch (err) {
    console.error('Error deleting old tasks:', err);
  }
});

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
