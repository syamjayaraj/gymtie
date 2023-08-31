const express = require("express");
const router = express.Router();

// Test the working

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Working",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
