let models = require("../model");
let _ = require("lodash");

getStats = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        req.user &&
        (req.user.userType == "admin" || req.user.userType == "branchAdmin")
      ) {
        let numberOfCustomers = await models.Customer.countDocuments({
          isListed: true,
        });
        let numberOfAdmins = await models.Admin.countDocuments({
          isListed: true,
        });
        let numberOfBranchAdmins = await models.BranchAdmin.countDocuments({
          isListed: true,
        });
        let numberOfStoreOwners = await models.StoreOwner.countDocuments({
          isListed: true,
        });
        let numberOfDeliveryGuys = await models.DeliveryGuy.countDocuments({
          isListed: true,
        });
        let numberOfUsers =
          numberOfCustomers +
          numberOfAdmins +
          numberOfBranchAdmins +
          numberOfStoreOwners +
          numberOfDeliveryGuys;

        let numberOfOrders = await models.Order.countDocuments({
          status: "completed",
          isListed: true,
        });
        let numberOfStores = await models.Store.countDocuments({
          isListed: true,
        });
        let orders = await models.Order.find({
          status: "completed",
          isListed: true,
        });
        let totalEarnings = 0;
        orders.map((order) => {
          totalEarnings += order.totalAmount;
        });
        totalEarnings = Math.floor(totalEarnings * 100) / 100;

        resolve({
          status: 200,
          data: {
            numberOfUsers: numberOfUsers,
            numberOfCustomers: numberOfCustomers,
            numberOfBranchAdmins: numberOfBranchAdmins,
            numberOfStoreOwners: numberOfStoreOwners,
            numberOfAdmins: numberOfAdmins,
            numberOfDeliveryGuys: numberOfDeliveryGuys,
            numberOfOrders: numberOfOrders,
            numberOfStores: numberOfStores,
            totalEarnings: totalEarnings,
          },
        });
      } else if (req.user && req.user.userType == "storeOwner") {
        let numberOfStores = await models.Store.find({
          storeOwner: req.user._id,
        }).countDocuments();

        let storesOfStoreOwner = await models.Store.find({
          storeOwner: req.user._id,
        }).select("_id");

        storesOfStoreOwner = storesOfStoreOwner.map((store) => {
          return store._id;
        });

        let numberOfOrders = await models.Order.find({
          store: { $in: storesOfStoreOwner },
        }).countDocuments();

        let orders = await models.Order.find({
          store: { $in: storesOfStoreOwner },
          isListed: true,
        })
          .populate("store")
          .populate("items.item")
          .populate("items.addonCategory")
          .populate("items.addon");

        let totalEarnings = 0;
        orders.map((order) => {
          totalEarnings += order.totalAmount;
        });

        let numberOfItemsSold = 0;
        orders.map((order) => {
          if (order.items.length !== 0) {
            order.items.map((item) => {
              numberOfItemsSold += item.quantity;
            });
          }
        });

        let numberOfPreparingOrders = await models.Order.find({
          store: { $in: storesOfStoreOwner },
          $or: [
            { status: "orderPlaced" },
            { status: "orderAccepted" },
            { status: "deliveryAssigned" },
            { status: "pickedUp" },
          ],
          isListed: true,
        }).countDocuments();

        resolve({
          status: 200,
          data: {
            numberOfStores: numberOfStores,
            numberOfOrders: numberOfOrders,
            numberOfItemsSold: numberOfItemsSold,
            totalEarnings: totalEarnings,
            preparingOrders: numberOfPreparingOrders,
          },
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
  getStats,
};
