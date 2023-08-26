let models = require("../model");
const _ = require("lodash");

listStoreCategoryCustomer = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeCategories = await models.Category.find({
        isListed: true,
      });
      resolve({
        status: 200,
        data: storeCategories,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

listStoreCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, skip } = req.query;
      let storeCategories = await models.StoreCategory.find({
        isListed: true,
      })
        .limit(Number(limit))
        .skip(Number(skip))
        .populate("storeOwner");

      resolve({
        status: 200,
        data: storeCategories,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

addNewStoreCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.body, "lorem");
      let storeCategory = new models.StoreCategory(req.body);
      storeCategory = await storeCategory.save();

      resolve({
        status: 200,
        data: storeCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editStoreCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeCategory = await models.StoreCategory.findOne({
        _id: req.params.id,
      });
      storeCategory = _.merge(
        storeCategory,
        _.pick(req.body, models.StoreCategory.fillable)
      );
      storeCategory = await storeCategory.save();
      storeCategory = await models.StoreCategory.findOne({
        _id: storeCategory._id,
      });

      resolve({
        status: 200,
        data: storeCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

getStoreCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeCategory = await models.StoreCategory.findById(req.params.id);
      resolve({
        status: 200,
        data: storeCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

deleteStoreCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeCategory = await models.StoreCategory.findOne({
        _id: req.params.storeCategoryId,
        isListed: true,
      });
      if (storeCategory) {
        storeCategory.isListed = false;
        storeCategory = await storeCategory.save();
        resolve({
          status: 200,
          message: "Store category deleted",
        });
      } else {
        reject({
          status: 200,
          message: "No Store category found",
        });
      }
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

module.exports = {
  getStoreCategory,
  listStoreCategoryCustomer,
  listStoreCategory,
  addNewStoreCategory,
  editStoreCategory,
  deleteStoreCategory,
};
