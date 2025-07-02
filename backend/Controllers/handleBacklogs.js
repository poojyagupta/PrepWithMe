const schedule = require("../Models/ScheduleSchema");
 
const MAX_STUDY_LIMIT = 180; // placeholder

async function handleBacklog(userId) {
    const missedSchedules = await schedule.find({
        userId,
        "tasks.status": "missed",
    }); // all documents with at least one task status: missed

    const missedTasks = [];
    missedSchedules.forEach((entry) => {
        entry.tasks.forEach((task) => {
            if (task.status === "missed") {
                missedTasks.push({ ...task.toObject(), originalDate: entry.date });
                // pushing a missed task into missedTasks, include original date of the schedule using originalDate
                // toObject is to convert the task to plain js object
            }
        });
    });

    const today = new Date().toISOString().split("T")[0]; // getting the current date format

    const upcoming = await schedule.find({
        userId,
        date: { $gt: today },
    }).sort({ date: 1 });

    const rescheduled = []; // keeping track of all the rescheduled tasks
    const archived = []; // keeping track of tasks that couldn't be rescheduled

    for (let task of missedTasks) {
        let placed = false;

        for (let day of upcoming) {
            const totalDuration = day.tasks.reduce(
                (sum, t) => sum + (t.duration || 0),
                0
            );

            if (totalDuration + task.duration <= MAX_STUDY_LIMIT) {
                day.tasks.push({ ...task, status: "pending" });

                await day.save();
                rescheduled.push({ task, newDate: day.date });
                placed = true;
                break;
            }
        }

        if (!placed) {
            archived.push(task);
        }
    }

    return { rescheduled, archived };
}

module.exports = handleBacklog;
