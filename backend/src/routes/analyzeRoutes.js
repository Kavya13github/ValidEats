const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyzeFood, scanFood } = require("../controllers/analyzeController");

router.post("/analyze", analyzeFood);
router.post("/scan", upload.single("image"), scanFood);

module.exports = router;
