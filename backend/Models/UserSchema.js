const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    default: "null",
  },
  goal: {
    type: String,
    default: "null",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
