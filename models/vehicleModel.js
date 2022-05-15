const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VehicleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  kmpl: {
    type: Number,
    required: true,
  },
});
module.exports = Vehicle = mongoose.model("vehicles", VehicleSchema);
