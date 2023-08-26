const express = require("express");
const router = express.Router();
const {
  listStoreCategory,
  addNewStoreCategory,
  editStoreCategory,
  deleteStoreCategory,
  getStoreCategory,
} = require("../controllers/storeCategoryController");
const { jwtauth } = require("../lib/jwtlib");

// List all store categories
router.get("/list?", [jwtauth], async (req, res) => {
  try {
    let response = await listStoreCategory(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      err: err.message,
    });
  }
});

// Add new store category
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await addNewStoreCategory(req);
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
    let response = await editStoreCategory(req);
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
    let response = await getStoreCategory(req);
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

router.delete("/:storeCategoryId", [jwtauth], async (req, res) => {
  try {
    let response = await deleteStoreCategory(req);
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
