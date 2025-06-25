// backend/utils/modelSchedule.js

const modelSchedules = {
  upscStyle: {
    Monday: ["History", "Polity"],
    Tuesday: ["Geography", "Economics"],
    Wednesday: ["Environment", "Science"],
    Thursday: ["History", "Current Affairs"],
    Friday: ["Polity", "Ethics"],
    Saturday: ["Mock Tests"],
    Sunday: ["Revision", "Rest"],
  },
  jeeStyle: {
    Monday: ["Math", "Physics"],
    Tuesday: ["Chemistry", "Physics"],
    Wednesday: ["Math", "Revision"],
    Thursday: ["Chemistry", "Mock Test"],
    Friday: ["Physics", "Doubt Solving"],
    Saturday: ["Math", "Previous Year Questions"],
    Sunday: ["Rest"],
  },
  chill: {
    Monday: ["Study"],
    Wednesday: ["Study"],
    Friday: ["Study"],
    Sunday: ["Light Revision"],
  },
};

module.exports = modelSchedules;
