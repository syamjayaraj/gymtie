let models = require("../model");
let _ = require("lodash");
let generateSlug = require("../lib/generateSlug");

listGymOptions = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gyms = await models.Gym.find({
        isListed: true,
      })
        .select("_id name")
        .sort({ name: -1 });

      resolve({
        status: 200,
        data: gyms,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

listGymSlugs = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gyms = await models.Gym.find({
        isListed: true,
      }).select("slug -_id");
      resolve({
        status: 200,
        data: gyms,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

listGym = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.admin);
      let gyms = await models.Gym.find({
        show: true,
        isListed: true,
      })
        .populate("category")
        .sort({ _id: -1 });

      resolve({
        status: 200,
        data: gyms,
      });
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

createNewGym = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gym = new models.Gym();
      gym = _.merge(gym, _.pick(req.body, models.Gym.fillable));
      gym.slug = generateSlug(req.body.name);
      gym?.owners?.push(req?.body?.owner);

      gym.markModified("images");
      gym.markModified("owners");
      gym = await gym.save();
      gym = await models.Gym.findOne({
        _id: gym._id,
      });

      owner = await models?.Owner?.findOne({
        _id: req?.body?.owner,
      });
      owner.gym = gym?._id;
      owner = await owner?.save();

      resolve({
        status: 200,
        data: gym,
      });
    } catch (err) {
      console.log(err);
      reject({
        message: err.message,
      });
    }
  });
};

getGym = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gym = await models.Gym.findOne({
        _id: req.params.gymId,
        isListed: true,
      });
      resolve({
        status: 200,
        data: gym,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

editGym = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gym = await models.Gym.findOne({
        _id: req.params.gymId,
        isListed: true,
      });
      if (gym) {
        gym = _.merge(gym, _.pick(req.body, models.Gym.fillable));
        gym.markModified("images");
        gym = await gym.save();

        gym = await models.Gym.findOne({
          _id: gym._id,
        }).populate("category");

        resolve({
          status: 200,
          data: gym,
        });
      } else {
        reject({
          message: "No gym found",
        });
      }
    } catch (err) {
      reject({
        message: err.message,
      });
    }
  });
};

deleteGym = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let gym = await models.Gym.findOne({
        _id: req.params.gymId,
        isListed: true,
      });
      if (gym) {
        gym.isListed = false;
        gym = await gym.save();

        resolve({
          status: 200,
          message: "Gym deleted",
        });
      } else {
        reject({
          message: "No gym found",
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
  getGym,
  listGym,
  listGymOptions,
  listGymSlugs,
  createNewGym,
  editGym,
  deleteGym,
};
