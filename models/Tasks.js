const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdBy: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
