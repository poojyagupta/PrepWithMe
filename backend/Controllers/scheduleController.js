const Schedule = require("../Models/ScheduleSchema");

// GET today's tasks
const getTodayTasks = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    const schedule = await Schedule.findOne({ userId, date: today });
    if (!schedule) {
      return res.status(404).json({ message: "No schedule for today." });
    }
    res.json(schedule.tasks);
  } catch (err) {
    console.error("❌ Error fetching today’s tasks:", err);
    res.status(500).json({ error: "Failed to fetch today’s tasks" });
  }
};

// PATCH task status
const updateTaskStatus = async (req, res) => {
  const { userId, date, topic, status } = req.body;

  if (!userId || !date || !topic || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const schedule = await Schedule.findOne({ userId, date });
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });

    let updated = false;

    schedule.tasks = schedule.tasks.map(task => {
      if (task.topic === topic) {
        task.status = status;
        updated = true;
      }
      return task;
    });

    if (!updated) return res.status(404).json({ error: "Task not found" });

    await schedule.save();
    res.json({ message: "Task status updated", schedule });
  } catch (err) {
    console.error("❌ Error updating task status:", err);
    res.status(500).json({ error: "Failed to update task status" });
  }
};

module.exports = {
  getTodayTasks,
  updateTaskStatus
};
