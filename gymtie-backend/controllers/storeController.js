let models = require("../model");
let _ = require("lodash");
let generateSlug = require("../lib/generateSlug");

listStoreOptions = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let stores = await models.Store.find({
        isListed: true,
      })
        .select("_id name")
        .sort({ name: -1 });

      resolve({
        status: 200,
        data: stores,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

listStoreSlugs = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let stores = await models.Store.find({
        isListed: true,
      }).select("slug -_id");
      resolve({
        status: 200,
        data: stores,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

listStore = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.admin);
      let stores = await models.Store.find({
        show: true,
        isListed: true,
      })
        .populate("category")
        .sort({ _id: -1 });

      resolve({
        status: 200,
        data: stores,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

createNewStore = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = new models.Store();
      store = _.merge(store, _.pick(req.body, models.Store.fillable));
      store.slug = generateSlug(req.body.name);
      store.markModified("images");

      store = await store.save();

      store = await models.Store.findOne({
        _id: store._id,
      }).populate("category");

      resolve({
        status: 200,
        data: store,
      });
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getStore = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = await models.Store.findOne({
        _id: req.params.storeId,
        isListed: true,
      });
      resolve({
        status: 200,
        data: store,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editStore = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = await models.Store.findOne({
        _id: req.params.storeId,
        isListed: true,
      });
      if (store) {
        store = _.merge(store, _.pick(req.body, models.Store.fillable));
        store.markModified("images");
        store = await store.save();

        store = await models.Store.findOne({
          _id: store._id,
        }).populate("category");

        resolve({
          status: 200,
          data: store,
        });
      } else {
        reject({
          message: "No store found",
        });
      }
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

deleteStore = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = await models.Store.findOne({
        _id: req.params.storeId,
        isListed: true,
      });
      if (store) {
        store.isListed = false;
        store = await store.save();

        resolve({
          status: 200,
          message: "Store deleted",
        });
      } else {
        reject({
          message: "No store found",
        });
      }
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};
module.exports = {
  getStore,
  listStore,
  listStoreOptions,
  listStoreSlugs,
  createNewStore,
  editStore,
  deleteStore,
};
