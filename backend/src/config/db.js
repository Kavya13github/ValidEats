const mongoose = require("mongoose");

const connectDB = async () => {
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 3000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        retryReads: true,
      });

      console.log(`✅ MongoDB Connected (attempt ${attempt})`);

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠️  MongoDB disconnected — attempting reconnect...");
        setTimeout(connectDB, RETRY_DELAY_MS);
      });

      mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB error:", err.message);
      });

      return;

    } catch (error) {
      console.error(`❌ MongoDB connection attempt ${attempt} failed: ${error.message}`);

      if (attempt === MAX_RETRIES) {
        console.error("🚨 All MongoDB connection attempts failed. Exiting...");
        process.exit(1);
      }

      console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }
};

module.exports = connectDB;
