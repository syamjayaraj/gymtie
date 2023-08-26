let models = require("../model");
const _ = require("lodash");

listItemCategoryCustomer = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategories = await models.Category.find({
        isListed: true,
      });
      resolve({
        status: 200,
        data: itemCategories,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

listItemCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, skip } = req.query;
      let itemCategories = await models.ItemCategory.find({
        isListed: true,
      })
        .limit(Number(limit))
        .skip(Number(skip))
        .populate("itemOwner");

      resolve({
        status: 200,
        data: itemCategories,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

addNewItemCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategory = new models.ItemCategory(req.body);
      itemCategory = await itemCategory.save();

      resolve({
        status: 200,
        data: itemCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editItemCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategory = await models.ItemCategory.findOne({
        _id: req.params.id,
      });
      itemCategory = _.merge(
        itemCategory,
        _.pick(req.body, models.ItemCategory.fillable)
      );
      itemCategory = await itemCategory.save();

      resolve({
        status: 200,
        data: itemCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

getItemCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategory = await models.ItemCategory.findById(req.params.id);
      resolve({
        status: 200,
        data: itemCategory,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

deleteItemCategory = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let itemCategory = await models.ItemCategory.findOne({
        _id: req.params.id,
      });
      itemCategory.isListed = false;
      itemCategory = await itemCategory.save();

      resolve({
        status: 200,
        data: itemCategory,
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
  getItemCategory,
  listItemCategoryCustomer,
  listItemCategory,
  addNewItemCategory,
  editItemCategory,
  deleteItemCategory,
};
