const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const logger = require("./Middleware/logger");
const studyPlanRoutes = require("./Routes/studyPlanRoutes");
const scheduleRoutes = require("./Routes/scheduleroutes");
//cors for communication between frontend and backend

require("dotenv").config();
//used for secret keys and other environment variables
const User = require("./Models/UserSchema");

const app = express();
//initializes the express app.

app.use(express.json());
//*parses incoming JSON requests and makes the data available in req.body
app.use(cors({origin:"*", allowedHeaders:["Content-Type", "Custom-Headers"]}));
//allows requests from frontend to reach backend.
//credentials: true allows cookies or tokens to be sent with requests.

app.use("/api/studyplan", studyPlanRoutes); //this will show in the http url
app.use("/api/schedule", scheduleRoutes );
//mounts the study plan and schedule routes to the app.
app.use(logger);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const JWT_SECRET = process.env.JWT_SECRET || "secret";
//loads a secret key ised to sign JWT tokens.

app.post("/Components/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedpass = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedpass,
      email,
    });

    res.status(201).json({ message: "user created!", user });
  } catch (error) {
    res.status(500).json({ error: "user already exists or other error" });
  }
});

app.post("/Components/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({
    message: "Login successful",
    token,
    user: { id: user._id, username: user.username, email: user.email },
  });
});

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "Public", "index.html"))
})

app.listen(5000, () => {
  console.log(`Server is running on 5000`);
});

