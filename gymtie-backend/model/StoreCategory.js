const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let storeCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    isListed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

storeCategorySchema.statics.fillable = ["name"];
storeCategorySchema.statics.returnable = ["name", "isListed"];

let StoreCategory = mongoose.model("storecategory", storeCategorySchema);

module.exports = StoreCategory;
