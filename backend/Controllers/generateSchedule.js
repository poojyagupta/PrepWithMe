//controller to:
//recieve a POST request with study plan data
//distribute topics over a schedule
//save the schedule to MongoDB

const Schedule = require("../Models/ScheduleSchema"); //lets us save and query schedules in MongoDB
const studyplan = require("../Models/StudyPlan"); //for saving the studyplan for future upgradtion and tracebility
const smartDistributeTopics = require("../Utils/smartDistributionTopics"); //splits topics over days
const { getTodayTasks } = require("./scheduleController");

// helper function to randomly assign difficulty (temporary, until user input)
function getRandomDifficulty() {
  const levels = ["Easy", "Medium", "Hard"];
  return levels[Math.floor(Math.random() * levels.length)];
}

const generateSchedule = async (req, res) => {
  
  try {
    console.log("generateschedule function called");
    const {
      userId,
      topicsMap,
      dailyStudyLimit,
      deadline,
      preferredStudyTime = "Morning",
      difficultylevel = "Medium",
    } = req.body; //pulling needed fields from the POST request body

    if (!userId || !topicsMap || !deadline || !dailyStudyLimit) {
      return res
        .status(400)
        .json({ error: "missing fields in request body" }); //responding with 400 bad request
    }

    const flattenedtopics = Object.values(topicsMap).flat();

    const staratDate = new Date();
    const endDate = new Date(deadline); //fixed typo: "dealine" → "deadline"
    const totalDays =
      Math.ceil((endDate - staratDate) / (1000 * 60 * 60 * 24)) + 1; //+1 for including today

    const scheduleByday = smartDistributeTopics(topicsMap, totalDays); //calling utility to spread topics over days
    const scheduleDocs = []; //empty array to save schedule entries

    scheduleByday.forEach((dayTasks, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index); //computing the date for each day by adding index days
      const formattedDate = date.toISOString().split("T")[0];

      const tasks = dayTasks.map((task) => ({
        subject: task.subject,
        topic: task.topic,
        status: "pending",
        duration: task.duration || 60,
        difficulty: getRandomDifficulty(), // assigning random difficulty
        notes: "",
      }));

      scheduleDocs.push({
        userId,
        date: formattedDate,
        tasks,
      });
    });

    await Schedule.insertMany(scheduleDocs); //saving all docs at once

    res.status(201).json({
      message: "📅 Schedule generated successfully",
      schedule: scheduleDocs,
    });
  } catch (error) {
    console.error("❌ Error generating schedule:", error); // This logs the real issue
    res.status(500).json({ error: "error", details: error.message });
  }
};

module.exports = generateSchedule;