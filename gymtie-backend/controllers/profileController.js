let models = require("../model");
const _ = require("lodash");

getProfile = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { userType } = req.user;
      let userModal =
        userType == "customer"
          ? "Customer"
          : userType == "deliveryGuy"
          ? "DeliveryGuy"
          : userType == "storeOwner"
          ? "StoreOwner"
          : userType == "branchAdmin"
          ? "BranchAdmin"
          : userType == "admin"
          ? "Admin"
          : null;
      let user = await models[userModal].findOne({
        _id: req.user._id,
      });
      resolve({
        status: 200,
        data: _.pick(user, models[userModal].returnable),
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

listCustomerAddress = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await models.Customer.findOne({
        _id: req.user._id,
      });
      resolve({
        status: 200,
        data: user.addresses,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editProfile = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { userType } = req.user;
      let userModal =
        userType == "customer"
          ? "Customer"
          : userType == "deliveryGuy"
          ? "DeliveryGuy"
          : userType == "storeOwner"
          ? "StoreOwner"
          : userType == "branchAdmin"
          ? "BranchAdmin"
          : userType == "admin"
          ? "Admin"
          : null;

      let user = await models[userModal].findOne({
        _id: req.user._id,
      });
      user = _.merge(user, _.pick(req.body, models[userModal].fillable));
      user.markModified("addresses");
      user = await user.save();
      resolve({
        status: 200,
        data: _.pick(user, models[userModal].returnable),
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

deleteProfile = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { userType } = req.user;
      let userModal =
        userType == "customer"
          ? "Customer"
          : userType == "deliveryGuy"
          ? "DeliveryGuy"
          : userType == "storeOwner"
          ? "StoreOwner"
          : userType == "branchAdmin"
          ? "BranchAdmin"
          : userType == "admin"
          ? "Admin"
          : null;

      let user = await models[userModal].findOneAndUpdate(
        { _id: req.user._id },
        {
          _isListed: false,
        },
        { new: true }
      );
      resolve({
        status: 200,
        message: "User deleted successfully",
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
  getProfile,
  listCustomerAddress,
  editProfile,
  deleteProfile,
};
