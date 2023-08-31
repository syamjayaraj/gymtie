let models = require("../model");
let _ = require("lodash");
let generateSlug = require("../lib/generateSlug");

listItem = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await models.Item.find({
        isListed: true,
      })
        .populate("category")
        .populate("store")
        .sort({ _id: -1 });

      resolve({
        status: 200,
        data: items,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

listItemUnderAStore = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      models.Store.findOne({
        slug: req.params.storeSlug,
      })
        .populate("category")
        .then((store) => {
          if (store) {
            models.Item.find({
              store: store._id,
            })
              .populate("category")
              .populate("store")
              .sort({ "category._id": -1, name: 1 })
              .then((items) => {
                let categoryWiseItems = [];
                items.map((item) => {
                  if (item.category) {
                    categoryExistsInCategoryWiseItems = false;
                    categoryWiseItems.map(
                      (categoryWiseItem, categoryWiseItemIndex) => {
                        if (
                          item.category._id.toString() ==
                          categoryWiseItem.category._id.toString()
                        ) {
                          itemExistsInCategoryWiseItems = false;
                          categoryWiseItems[categoryWiseItemIndex].items.map(
                            (itemInCategoryWiseItems) => {
                              if (itemInCategoryWiseItems._id == item._id) {
                                itemExistsInCategoryWiseItems = true;
                              }
                            }
                          );
                          if (!itemExistsInCategoryWiseItems) {
                            categoryWiseItems[categoryWiseItemIndex].items.push(
                              item
                            );
                          }
                          categoryExistsInCategoryWiseItems = true;
                        }
                      }
                    );
                    if (!categoryExistsInCategoryWiseItems) {
                      categoryWiseItems.push({
                        category: item.category,
                        items: [item],
                      });
                    }
                  }
                });

                resolve({
                  status: 200,
                  store: store,
                  data: categoryWiseItems,
                });
              });
          } else {
            reject({
              message: "Store not found",
            });
          }
        });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

createNewItem = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = new models.Item();
      item = _.merge(item, _.pick(req.body, models.Item.fillable));
      item.slug = generateSlug(req.body.name);
      item.markModified("prices");
      item.markModified("images");

      item = await item.save();

      item = await models.Item.findOne({
        _id: item._id,
      })
        .populate("category")
        .populate("store");

      resolve({
        status: 200,
        data: item,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

getItem = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await models.Item.findOne({
        _id: req.params.itemId,
        isListed: true,
      })
        .populate("category")
        .populate("store");
      resolve({
        status: 200,
        data: item,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editItem = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await models.Item.findOne({
        _id: req.params.itemId,
        isListed: true,
      });
      if (item) {
        item = _.merge(item, _.pick(req.body, models.Item.fillable));
        item.markModified("prices");
        item.markModified("images");
        item = await item.save();

        item = await models.Item.findOne({
          _id: item._id,
        })
          .populate("category")
          .populate("store");
        resolve({
          status: 200,
          data: item,
        });
      } else {
        reject({
          message: "No item found",
        });
      }
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

deleteItem = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = new models.Item.findOne({
        _id: req.params.itemId,
        isListed: true,
      });
      if (item) {
        item.isListed = false;
        item = await item.save();

        resolve({
          status: 200,
          message: "Item deleted",
        });
      } else {
        reject({
          message: "No item found",
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
  getItem,
  listItem,
  listItemUnderAStore,
  createNewItem,
  editItem,
};
