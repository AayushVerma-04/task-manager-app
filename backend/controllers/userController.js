import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(201).json({ email, id: user._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, id: user._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { signup, login };
