import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task"
    }
  ]
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Both email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, tasks: [] });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Both email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not registered");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
