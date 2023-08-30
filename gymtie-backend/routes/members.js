const express = require("express");
const router = express.Router();
const {
  listMember,
  addNewMember,
  editMember,
  deleteMember,
  getMember,
} = require("../controllers/memberController");
const { jwtauth } = require("../lib/jwtlib");

// List all members
router.get("/list?", [jwtauth], async (req, res) => {
  try {
    let response = await listMember(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      err: err.message,
    });
  }
});

// Add new member
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await addNewMember(req);
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

router.put("/:id", [jwtauth], async (req, res) => {
  try {
    let response = await editMember(req);
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

router.get("/:id", [jwtauth], async (req, res) => {
  try {
    let response = await getMember(req);
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

router.put("/:id", [jwtauth], async (req, res) => {
  try {
    let response = await deleteMember(req);
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
