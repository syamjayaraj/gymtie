const express = require("express");
const router = express.Router();
const {
  listPayment,
  addNewPayment,
  editPayment,
  deletePayment,
  getPayment,
} = require("../controllers/paymentController");
const { jwtauth } = require("../lib/jwtlib");

// List all payments
router.get("/list?", [jwtauth], async (req, res) => {
  try {
    let response = await listPayment(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      err: err.message,
    });
  }
});

// Add new payment
router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await addNewPayment(req);
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
    let response = await editPayment(req);
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
    let response = await getPayment(req);
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
    let response = await deletePayment(req);
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
