const express = require("express");
const router = express.Router();
const Schedule = require("../Models/ScheduleSchema"); // Ensure this path is correct
const smartDistributeTopics = require("../Utils/smartDistributionTopics"); // Add this at the top

// Generate schedule based on user topics + duration
router.post("/generate", async (req, res) => {
  console.log("Received POST to /generate with data:", req.body);
  try {
    const { userId, topicsMap, totalDays } = req.body;

    const distributed = smartDistributeTopics(topicsMap, totalDays);

    const scheduleDocs = [];

    distributed.forEach((tasks, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);

      scheduleDocs.push({
        userId,
        date: day.toISOString().split("T")[0],
        tasks: tasks.map((task) => ({
          subject: task.subject,
          topic: task.topic,
          duration: 60, // or make dynamic later
        })),
      });
    });

    const saved = await Schedule.insertMany(scheduleDocs);
    res
      .status(201)
      .json({ message: "Generated successfully", schedule: saved });
  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: "Schedule generation failed" });
  }
});
module.exports = router;
