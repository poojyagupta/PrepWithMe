const express = require("express");
const router = express.Router(); //used so that we dont clutter app.js
const StudyPlan = require("../Models/StudyPlan");

//POST route to create a new study plan
router.post("/create", async (req, res) => {
  try {
    console.log("POST /create route hit!");

    const newStudyPlan = new StudyPlan(req.body);
    await newStudyPlan.save();
    res.status(201).json({
      message: "Study Plan created successfully",
      studyplan: newStudyPlan,
    });
  } catch (error) {
    console.error("Error saving study plan:", error);
    res.status(500).json({ error });
  }
});

//GET route to fetch all study plans of a user
router.get("/:userId", async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.params.userId });
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch study plans" });
  }
});

module.exports = router;
