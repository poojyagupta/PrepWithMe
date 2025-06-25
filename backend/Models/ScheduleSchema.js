const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  subject: String,
  topic: String,
  duration: Number, // in minutes or hours
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  notes: String,
});

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
