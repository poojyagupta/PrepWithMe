const express = require("express");
const router = express.Router();

const {

  getTodayTasks,
  updateTaskStatus
} = require("../Controllers/scheduleController");
const generateSchedule  = require("../Controllers/generateSchedule");
console.log("this funtion called");
// Routes
router.post("/generate", generateSchedule);
router.get("/today/:userId", getTodayTasks);
router.patch("/update-status", updateTaskStatus); // Optional, for task updates

module.exports = router;
