const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

const corsOptions = {
  origin: [
    'https://valideats.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

app.use("/api/v1", analyzeRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "🚀 ValidEats Ultra Backend Running",
    time: new Date()
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Something broke!",
    error: err.message
  });
});

module.exports = app;
