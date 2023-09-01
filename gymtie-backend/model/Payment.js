const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let paymentSchema = new Schema(
  {
    gym: {
      type: Schema.Types.ObjectId,
      ref: "gym",
      required: true,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "member",
      required: true,
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

paymentSchema.statics.fillable = ["member", "amount", "paymentDate", "note"];

paymentSchema.statics.returnable = [
  "_id",
  "gym",
  "member",
  "amount",
  "paymentDate",
  "note",
  "createdAt",
  "updatedAt",
];

let Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
