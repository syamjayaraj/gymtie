const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let paymentSchema = new Schema(
  {
    gym: {
      type: Schema.Types.ObjectId,
      ref: "gym",
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "member",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

paymentSchema.statics.fillable = ["gym", "member", "amount", "show"];

paymentSchema.statics.returnable = [
  "_id",
  "gym",
  "member",
  "amount",
  "show",
  "createdAt",
  "updatedAt",
];

let Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
