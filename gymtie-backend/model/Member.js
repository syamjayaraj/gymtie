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
    show: {
      type: Boolean,
      default: true,
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
  "slug",
  "name",
  "about",
  "category",
  "prices",
  "images",
  "isVeg",
  "isListed",
];

memberSchema.statics.fillable = [
  "gym",
  "name",
  "about",
  "category",
  "prices",
  "images",
  "isVeg",
  "show",
];

let Member = mongoose.model("member", memberSchema);

module.exports = Member;
