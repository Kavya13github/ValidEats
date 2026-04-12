require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// ================= PORT =================
const PORT = process.env.PORT || 5000;

// ================= SERVER START =================
const server = app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  connectDB();
});

// ================= GRACEFUL SHUTDOWN =================
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    const mongoose = require("mongoose");
    await mongoose.connection.close();
    console.log("✅ Database connection closed. Bye!");
    process.exit(0);
  });
};

process.on("SIGINT",  () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));