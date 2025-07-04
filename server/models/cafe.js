const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  openedAt: { type: Date, default: Date.now }
});

const Cafe = mongoose.model("Cafe", cafeSchema);
module.exports = { Cafe };
