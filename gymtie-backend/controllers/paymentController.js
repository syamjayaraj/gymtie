let models = require("../model");
const _ = require("lodash");

listPayment = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payments = await models.Payment.find({
        isListed: true,
        gym: req?.admin?.gym,
      })
        .populate("member", "name memberId phoneNumber joiningDate")
        .sort({ _id: -1 });

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

listPaymentsOfMember = (req) => {
  console.log("hai");
  return new Promise(async (resolve, reject) => {
    try {
      let payments = await models.Payment.find({
        isListed: true,
        gym: req?.admin?.gym,
        member: req?.params?.memberId,
      }).sort({ _id: -1 });
      console.log(payments, "payments");
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
      let payment = new models.Payment();
      payment = _.merge(payment, _.pick(req.body, models.Payment.fillable));
      payment.gym = req?.admin?.gym;
      payment = await payment.save();
      resolve({
        status: 200,
        data: payment,
      });
    } catch (err) {
      console.log(err, "err");
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
  listPayment,
  listPaymentsOfMember,
  addNewPayment,
  editPayment,
  deletePayment,
};
