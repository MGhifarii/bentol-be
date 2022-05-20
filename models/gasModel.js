const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Gas = mongoose.model("Gas", GasSchema);
