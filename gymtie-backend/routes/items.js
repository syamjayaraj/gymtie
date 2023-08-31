const express = require("express");
const router = express.Router();
let {
  createNewItem,
  listItem,
  listItemUnderAStore,
  getItem,
  editItem,
} = require("../controllers/itemController");
const { jwtauth } = require("../lib/jwtlib");

// List all items
router.get("/list?", [jwtauth], async (req, res) => {
  try {
    let response = await listItem(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// List all items under a store
router.get("/store/:storeSlug/list/?", async (req, res) => {
  try {
    let response = await listItemUnderAStore(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Add new item
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await createNewItem(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Get item details
router.get("/:itemId", [jwtauth], async (req, res) => {
  try {
    let response = await getItem(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Edit item details
router.put("/:itemId", [jwtauth], async (req, res) => {
  try {
    let response = await editItem(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// Delete item
router.delete("/:itemId", [jwtauth], async (req, res) => {
  try {
    let response = await deleteItem(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
