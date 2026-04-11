require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// ================= PORT =================
const PORT = process.env.PORT || 5000;

// ================= SERVER START =================
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});