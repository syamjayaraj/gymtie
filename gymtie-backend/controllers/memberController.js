const generateMemberId = require("../lib/generateMemberId");
let models = require("../model");
const _ = require("lodash");

listMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, skip } = req.query;
      let members = await models.Member.find({
        gym: req?.admin?.gym,
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
      const params = { ...req.body, gym: req?.admin?.gym };
      let member = new models.Member();
      member = _.merge(member, _.pick(params, models.Member.fillable));

      const numberOfMembers = await models?.Member?.countDocuments();
      member.memberId = generateMemberId(numberOfMembers);

      member = await member.save();
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

editMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await models.Member.findOne({
        _id: req?.params?.id,
        gym: req?.admin?.gym,
        isListed: true,
      });
      member = _.merge(member, _.pick(req.body, models.Member.fillable));
      member = await member.save();
      member = await models.Member.findOne({
        _id: member._id,
        isListed: true,
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
      let member = await models.Member.findOne({
        _id: req.params.id,
        gym: req?.admin?.gym,
        isListed: true,
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

deleteMember = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await models.Member.findOne({
        _id: req.params.id,
        gym: req?.admin?.gym,
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
  listMember,
  addNewMember,
  editMember,
  deleteMember,
};
