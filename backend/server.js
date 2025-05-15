import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import cors from 'cors';
import express from 'express'
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;
const mongodbURL = process.env.mongodbURL;

app.use(express.json());
app.use(cors());

app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });