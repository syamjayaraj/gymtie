const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let itemCategorySchema = new Schema(
  {
    name: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

itemCategorySchema.statics.fillable = ["name", "show"];

itemCategorySchema.statics.returnable = [
  "_id",
  "name",
  "show",
  "createdAt",
  "updatedAt",
];

let ItemCategory = mongoose.model("itemcategory", itemCategorySchema);

module.exports = ItemCategory;
