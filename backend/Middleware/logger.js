// middleware/logger.js
const logger = (req, res, next) => {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  console.log("====================================");
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  console.log(`🕒 Time: ${now}`);
  console.log("📦 Body:", req.body);
  console.log("====================================");

  next(); // continue to the next middleware or route
};

module.exports = logger;
