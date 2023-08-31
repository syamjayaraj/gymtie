const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/dashboardController");
const { jwtauth } = require("../lib/jwtlib");

router.get("/stats", [jwtauth], async (req, res) => {
  try {
    let response = await getStats(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
