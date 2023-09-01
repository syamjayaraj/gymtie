const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let ownerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gym: {
      type: Schema.Types.ObjectId,
      ref: "gym",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ownerSchema.methods.generatePasswordHash = (password) => {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

ownerSchema.methods.validatePassword = (password, hashedPassword) => {
  let res = bcrypt.compareSync(password, hashedPassword);
  return res;
};

ownerSchema.statics.fillable = ["name", "mobile", "email", "gym"];

ownerSchema.statics.returnable = [
  "_id",
  "name",
  "mobile",
  "email",
  "token",
  "gym",
  "userType",
  "createdAt",
  "updatedAt",
];

let Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;
