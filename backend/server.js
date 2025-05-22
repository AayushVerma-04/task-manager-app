const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const dotenv = require("dotenv");
dotenv.config();

const mongodbURL = process.env.mongodbURL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
