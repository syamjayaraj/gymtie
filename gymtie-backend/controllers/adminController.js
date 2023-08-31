const express = require("express");
const router = express.Router();
let models = require("../model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

registerAdmin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, email, mobile, password } = req.body;
      let admin = await models.Admin.findOne();
      if (!admin) {
        admin = new models.Admin();
        admin.name = name;
        admin.email = email;
        admin.mobile = mobile;
        admin.password = admin.generatePasswordHash(password);
        admin.token = jwt.sign(
          {
            _id: admin._id,
            userType: "Admin",
          },
          config.secret,
          {
            expiresIn: "10d",
          }
        );
        admin.userType = "Admin";
        admin = await admin.save();
        admin = _.pick(admin, models.Admin.returnable);
        resolve({
          status: 200,
          data: admin,
        });
      } else {
        reject({
          status: 400,
          message: "Admin exists",
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

loginAdmin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let admin = await models.Admin.findOne({
        email: req.body.email,
      });
      if (admin) {
        let isUserAuthenticated = admin.validatePassword(
          req.body.password,
          admin.password
        );
        if (isUserAuthenticated) {
          admin.token = jwt.sign(
            {
              _id: admin._id,
              userType: "Admin",
            },
            config.secret,
            {
              expiresIn: "10d",
            }
          );
          resolve({
            status: 200,
            data: _.pick(admin, models.Admin.returnable),
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

verifyAdmin = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("hai");
      resolve({
        status: 200,
        data: req.admin,
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
  registerAdmin,
  loginAdmin,
  verifyAdmin,
};
