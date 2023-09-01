let models = require("../model");
const _ = require("lodash");

listMemberCustomer = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let members = await models.Category.find({
        isListed: true,
      });
      resolve({
        status: 200,
        data: members,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

listMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, skip } = req.query;
      let members = await models.Member.find({
        isListed: true,
      })
        .limit(Number(limit))
        .skip(Number(skip))
        .populate("storeOwner");

      resolve({
        status: 200,
        data: members,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

addNewMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (req?.admin?.userType === "Admin") {
        let member = new models.Member(req.body);
        member = await member.save();
        resolve({
          status: 200,
          data: member,
        });
      } else if (req?.admin?.userType === "Owner") {
        const params = { ...req.body, gym: req.admin?.gym };
        let member = new models.Member(params);
        member = await member.save();
        resolve({
          status: 200,
          data: member,
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

editMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await models.Member.findOne({
        _id: req.params.id,
      });
      member = _.merge(member, _.pick(req.body, models.Member.fillable));
      member = await member.save();
      member = await models.Member.findOne({
        _id: member._id,
      });

      resolve({
        status: 200,
        data: member,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

getMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await models.Member.findById(req.params.id);
      resolve({
        status: 200,
        data: member,
      });
    } catch (err) {
      reject({
        status: 200,
        message: err.message,
      });
    }
  });
};

deleteMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await models.Member.findOne({
        _id: req.params.id,
        isListed: true,
      });
      if (member) {
        member.isListed = false;
        member = await member.save();
        resolve({
          status: 200,
          message: "Member deleted",
        });
      } else {
        reject({
          status: 200,
          message: "No Member found",
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
  getMember,
  listMemberCustomer,
  listMember,
  addNewMember,
  editMember,
  deleteMember,
};
