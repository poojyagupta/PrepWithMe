//this is for the actual schedule to be made based on the studyplan
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
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
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
