const express = require("express");
const router = express.Router();
const handleBacklog = require("../Controllers/handleBacklogs");

router.post("/fix", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const result = await handleBacklog(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Backlog handling failed", details: err.message });
  }
});

module.exports = router;
