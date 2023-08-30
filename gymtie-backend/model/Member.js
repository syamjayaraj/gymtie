const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let memberSchema = new Schema(
  {
    gym: {
      type: Schema.Types.ObjectId,
      ref: "gym",
    },
    name: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
    },
    about: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: String,
    },
    landmark: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    phoneNumber2: {
      type: String,
    },
    email: {
      type: String,
    },
    images: {
      type: Array,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

memberSchema.statics.returnable = [
  "_id",
  "gym",
  "name",
  "joiningDate",
  "about",
  "address",
  "city",
  "state",
  "country",
  "pincode",
  "landmark",
  "phoneNumber",
  "phoneNumber2",
  "email",
  "images",
  "isListed",
];

memberSchema.statics.fillable = [
  "gym",
  "name",
  "joiningDate",
  "about",
  "address",
  "city",
  "state",
  "country",
  "pincode",
  "landmark",
  "phoneNumber",
  "phoneNumber2",
  "email",
  "images",
];

let Member = mongoose.model("member", memberSchema);

module.exports = Member;
