const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const authMiddleware = require("../middleware/auth");

// Save or update company details
router.post("/", authMiddleware, async (req, res) => {
     console.log("Received body:", req.body);

    const { userId } = req.user;
  try {
    let company = await Company.findOne({ user: userId });
    if (company) {
      company = await Company.findOneAndUpdate({ user: userId }, req.body, { new: true });
    } else {
      company = await Company.create({ ...req.body, user: userId });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get company details
router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  try {
    const company = await Company.findOne({ user: userId });
    res.json(company || {});
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
