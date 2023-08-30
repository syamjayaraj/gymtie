const express = require("express");
const router = express.Router();
let models = require("../model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

registerOwner = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, mobile, password } = req.body;
      let owner = await models.Owner.findOne();
      if (!owner) {
        owner = new models.Owner();
        owner.name = name;
        owner.email = email;
        owner.mobile = mobile;
        owner.password = owner.generatePasswordHash(password);
        owner.token = jwt.sign(
          {
            _id: owner._id,
            userType: "owner",
          },
          config.secret,
          {
            expiresIn: "10d",
          }
        );
        owner = await owner.save();
        owner = _.pick(owner, models.Owner.returnable);
        resolve({
          status: 200,
          data: owner,
        });
      } else {
        reject({
          status: 400,
          message: "Owner exists",
        });
      }
    } catch (err) {
      reject({
        status: 400,
        message: err.message,
      });
    }
  });
};

loginOwner = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let owner = await models.Owner.findOne({
        email: req.body.email,
      });
      if (owner) {
        let isUserAuthenticated = owner.validatePassword(
          req.body.password,
          owner.password
        );
        if (isUserAuthenticated) {
          owner.token = jwt.sign(
            {
              _id: owner._id,
              userType: "owner",
            },
            config.secret,
            {
              expiresIn: "10d",
            }
          );
          resolve({
            status: 200,
            data: _.pick(owner, models.Owner.returnable),
          });
        } else {
          reject({
            status: 400,
            message: "Password is incorrect",
          });
        }
      } else {
        reject({
          status: 400,
          message: "No account exist",
        });
      }
    } catch (err) {
      console.log(err);
      reject({
        status: 400,
        message: err.message,
      });
    }
  });
};

verifyOwner = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({
        status: 200,
        data: req.owner,
      });
    } catch (err) {
      console.log(err);
      reject({
        status: 400,
        message: err.message,
      });
    }
  });
};

module.exports = {
  registerOwner,
  loginOwner,
  verifyOwner,
};
