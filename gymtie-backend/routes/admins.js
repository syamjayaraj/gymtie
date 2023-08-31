const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  verifyAdmin,
} = require("../controllers/adminController");
const { jwtauth } = require("../lib/jwtlib");

router.post("/register", async (req, res) => {
  try {
    let response = await registerAdmin(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let response = await loginAdmin(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/verify", [jwtauth], async (req, res) => {
  try {
    let response = await verifyAdmin(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
