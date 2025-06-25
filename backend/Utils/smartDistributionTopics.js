// utils/smartDistributeTopics.js
const interleaveTopics = require("./InterleaveTopics");

function smartDistributeTopics(topicsMap, totalDays) {
  const flatList = interleaveTopics(topicsMap);

  const schedule = Array.from({ length: totalDays }, () => []);

  for (let i = 0; i < flatList.length; i++) {
    // Try to find the best day to assign this topic
    let placed = false;
    for (let offset = 0; offset < totalDays; offset++) {
      const day = (i + offset) % totalDays;
      const daySubjects = schedule[day].map((t) => t.subject);
      if (!daySubjects.includes(flatList[i].subject)) {
        schedule[day].push(flatList[i]);
        placed = true;
        break;
      }
    }

    // If couldn't place uniquely, fallback to round-robin
    if (!placed) {
      const day = i % totalDays;
      schedule[day].push(flatList[i]);
    }
  }

  return schedule;
}

module.exports = smartDistributeTopics;
