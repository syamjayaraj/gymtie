let models = require("../model");
const _ = require("lodash");

listPaymentCustomer = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payments = await models.Category.find({
        isListed: true,
      });
      resolve({
        status: 200,
        data: payments,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

listPayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, skip } = req.query;
      let payments = await models.Payment.find({
        isListed: true,
      })
        .limit(Number(limit))
        .skip(Number(skip))
        .populate("itemOwner");

      resolve({
        status: 200,
        data: payments,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

addNewPayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payment = new models.Payment(req.body);
      payment = await payment.save();

      resolve({
        status: 200,
        data: payment,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editPayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payment = await models.Payment.findOne({
        _id: req.params.id,
      });
      payment = _.merge(payment, _.pick(req.body, models.Payment.fillable));
      payment = await payment.save();

      resolve({
        status: 200,
        data: payment,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

getPayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payment = await models.Payment.findById(req.params.id);
      resolve({
        status: 200,
        data: payment,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

deletePayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payment = await models.Payment.findOne({
        _id: req.params.id,
      });
      payment.isListed = false;
      payment = await payment.save();

      resolve({
        status: 200,
        data: payment,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

module.exports = {
  getPayment,
  listPaymentCustomer,
  listPayment,
  addNewPayment,
  editPayment,
  deletePayment,
};
