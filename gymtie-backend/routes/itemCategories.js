const express = require("express");
const router = express.Router();
const {
  listItemCategory,
  addNewItemCategory,
  editItemCategory,
  deleteItemCategory,
  getItemCategory,
} = require("../controllers/itemCategoryController");
const { jwtauth } = require("../lib/jwtlib");

// List all item categories
router.get("/list?", [jwtauth], async (req, res) => {
  try {
    let response = await listItemCategory(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      err: err.message,
    });
  }
});

// Add new item category
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await addNewItemCategory(req);
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
    let response = await editItemCategory(req);
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
    let response = await getItemCategory(req);
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
    let response = await deleteItemCategory(req);
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
