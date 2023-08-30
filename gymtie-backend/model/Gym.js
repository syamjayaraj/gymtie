const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let gymSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owners: {
      type: Array,
    },
    slug: {
      type: String,
    },
    about: {
      type: String,
    },
    timing: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    phoneNumber2: {
      type: String,
    },
    images: {
      type: Array,
    },
    rating: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
      },
    },
    whatsapp: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    currencySign: {
      type: String,
    },
    upi: {
      type: Boolean,
    },
    card: {
      type: Boolean,
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

gymSchema.index({ location: "2dsphere" });

gymSchema.statics.fillable = [
  "name",
  "owners",
  "about",
  "timing",
  "phoneNumber",
  "phoneNumber2",
  "images",
  "rating",
  "email",
  "website",
  "address",
  "city",
  "state",
  "country",
  "pincode",
  "landmark",
  "location",
  "whatsapp",
  "facebook",
  "instagram",
  "youtube",
  "currencySign",
  "upi",
  "card",
  "show",
];

gymSchema.statics.returnable = [
  "_id",
  "name",
  "slug",
  "owners",
  "about",
  "timing",
  "phoneNumber",
  "phoneNumber2",
  "images",
  "rating",
  "email",
  "website",
  "address",
  "city",
  "state",
  "country",
  "pincode",
  "landmark",
  "location",
  "whatsapp",
  "facebook",
  "instagram",
  "youtube",
  "currencySign",
  "upi",
  "card",
  "show",
];

let Store = mongoose.model("gym", gymSchema);

module.exports = Store;
