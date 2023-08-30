const express = require("express");
const router = express.Router();
const {
  registerOwner,
  loginOwner,
  verifyOwner,
} = require("../controllers/ownerController");
const { jwtauth } = require("../lib/jwtlib");

router.post("/register", [jwtauth], async (req, res) => {
  try {
    let response = await registerOwner(req);
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
    let response = await loginOwner(req);
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
    let response = await verifyOwner(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
