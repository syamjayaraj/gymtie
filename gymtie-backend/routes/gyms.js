const express = require("express");
const router = express.Router();

const {
  createNewGym,
  listGym,
  listGymOptions,
  listGymSlugs,
  getGym,
  editGym,
  deleteGym,
} = require("../controllers/gymController");
const { jwtauth } = require("../lib/jwtlib");

// List all gyms
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let response = await listGymOptions(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// List all gym slugs
router.get("/list/slugs", [jwtauth], async (req, res) => {
  try {
    let response = await listGymSlugs(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// List all gyms
router.get("/list?", async (req, res) => {
  try {
    let response = await listGym(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Add new gym
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await createNewGym(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Get gym details
router.get("/:gymId", [jwtauth], async (req, res) => {
  try {
    let response = await getGym(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//Edit gym
router.put("/:gymId", [jwtauth], async (req, res) => {
  try {
    let response = await editGym(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:gymId", [jwtauth], async (req, res) => {
  try {
    let response = await deleteGym(req);
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
