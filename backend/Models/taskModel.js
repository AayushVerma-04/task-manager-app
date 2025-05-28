const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required : true
  },
  deadline: {
    type: Date,
    required : true
  },
  isCompleted: {
    type: Boolean,
    default : false
  },
  completedAt: {
    type: Date,
    default: null,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isDeleted : {
    type: Boolean,
    default : false
  }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task