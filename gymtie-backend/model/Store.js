const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let storeSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "storecategory",
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    orderNow: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
    },
    about: {
      type: String,
    },
    isPureVeg: {
      type: Boolean,
      default: false,
    },
    onlineDelivery: {
      type: Boolean,
      default: false,
    },
    opensAt: {
      type: String,
    },
    closesAt: {
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

storeSchema.index({ location: "2dsphere" });

storeSchema.statics.fillable = [
  "category",
  "name",
  "owner",
  "about",
  "orderNow",
  "isPureVeg",
  "onlineDelivery",
  "opensAt",
  "closesAt",
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

storeSchema.statics.returnable = [
  "_id",
  "category",
  "name",
  "slug",
  "orderNow",
  "owner",
  "about",
  "isPureVeg",
  "onlineDelivery",
  "opensAt",
  "closesAt",
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

let Store = mongoose.model("store", storeSchema);

module.exports = Store;
