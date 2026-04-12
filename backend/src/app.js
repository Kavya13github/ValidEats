const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// ================= SECURITY =================
app.use(helmet());

// ================= PERFORMANCE =================
app.use(compression());

// ================= LOGGING =================
app.use(morgan("dev"));

// ================= CORS =================
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://valid-eats.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// ================= BODY PARSER =================
app.use(express.json({ limit: "10mb" }));
 
// routes use karo
app.use("/api/v1", analyzeRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "🚀 ValidEats Ultra Backend Running",
    time: new Date()
  });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  res.status(500).json({
    success: false,
    message: "Something broke!",
    error: err.message
  });
});

module.exports = app;
