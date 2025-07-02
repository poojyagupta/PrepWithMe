//this is for the form that user fills in the starting
const mongoose = require("mongoose");
const StudyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "UserSchema", //tells mongodb this links to the user schema
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topics: [String], //dropdown, array of topic names
  difficultylevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  deadline:{
    type:String,
  },
 
  dailyStudyLimit: {
    type: Number,
    required: true,
  },
  preferredStudyTime: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening", "Night", "Flexible"],
    default: "Morning",
  },

});

module.exports = mongoose.model("StudyPlan", StudyPlanSchema);
