const express = require("express");
const router = express.Router();

const {
  createNewStore,
  listStore,
  listStoreOptions,
  listStoreSlugs,
  getStore,
  editStore,
  deleteStore,
} = require("../controllers/storeController");
const { jwtauth } = require("../lib/jwtlib");

// List all stores
router.get("/list/options", [jwtauth], async (req, res) => {
  try {
    let response = await listStoreOptions(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// List all store slugs
router.get("/list/slugs", [jwtauth], async (req, res) => {
  try {
    let response = await listStoreSlugs(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// List all stores
router.get("/list?", async (req, res) => {
  try {
    let response = await listStore(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Add new store
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await createNewStore(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Get store details
router.get("/:storeId", [jwtauth], async (req, res) => {
  try {
    let response = await getStore(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//Edit store
router.put("/:storeId", [jwtauth], async (req, res) => {
  try {
    let response = await editStore(req, res);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:storeId", [jwtauth], async (req, res) => {
  try {
    let response = await deleteStore(req);
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
