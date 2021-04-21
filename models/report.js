const mongoose = require("mongoose");
const uuid = require("uuid");

const reportSchema = new mongoose.Schema({
  userID: {
    type: [String],
    require: true,
  },

  marketID: {
    type: String,
    require: true,
  },

  marketName: {
    type: String,
  },

  cmdtyID: {
    type: String,
    require: true,
  },

  marketType: {
    type: String,
  },

  cmdtyName: {
    type: String,
  },

  convFctr: {
    type: Number,
    require: true,
  },

  priceUnit: {
    type: String,
    default: "Kg",
  },

  price: {
    type: Number,
    require: true,
  },

  _id: {
    type: String,
    default: uuid.v4,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
