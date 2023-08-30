const jwt = require("jsonwebtoken");
const models = require("../model");
const config = require("../config");
const _ = require("lodash");

let verifyToken = (token, next) => {
  try {
    var decoded = jwt.verify(token, config.secret);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        var decoded = jwt.decode(token);
        if (decoded) {
          return { ...decoded, expired: true };
        } else return false;
      } else return false;
    }
  }
};

let tokenValidation = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (token) {
    req.token = token;
    try {
      const decodedToken = verifyToken(req.token, next);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: "Owner token needed",
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);

        let owner = await models.Owner.findOne({
          _id: decoded._id,
        });

        owner.token = jwt.sign(
          {
            _id: owner._id,
          },
          config.secret,
          {
            expiresIn: "20s",
          }
        );
        req.owner = { owner, userType: decoded.userType };
        next();
      } else {
        let owner = await models.Owner.findOne({
          _id: decodedToken._id,
        });
        owner.token = req.token;
        req.owner = _.pick(owner, models.Owner.returnable);
        next();
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Error with your token",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "Owner token needed",
    });
  }
};

module.exports.jwtauthOwner = tokenValidation;
