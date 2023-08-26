const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let { nanoid } = require("nanoid");
let uniqueId = nanoid(5);
var slugify = require("slugify");

let itemSchema = new Schema(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: "store",
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    about: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "itemcategory",
    },
    prices: {
      type: Array,
    },
    images: {
      type: Array,
    },
    isVeg: {
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

itemSchema.methods.generateSlug = (name) => {
  let slugifiedName = slugify(name, {
    lower: true,
  });
  slugifiedName = slugifiedName + "-" + uniqueId;
  return slugifiedName;
};

itemSchema.statics.returnable = [
  "_id",
  "store",
  "slug",
  "name",
  "about",
  "category",
  "prices",
  "images",
  "isVeg",
  "isListed",
];

itemSchema.statics.fillable = [
  "store",
  "name",
  "about",
  "category",
  "prices",
  "images",
  "isVeg",
  "show",
];

let Item = mongoose.model("item", itemSchema);

module.exports = Item;
