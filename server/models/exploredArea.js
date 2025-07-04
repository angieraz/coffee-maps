const mongoose = require("mongoose");

const exploredAreaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coordinates: [
    {
      lat: Number,
      lng: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const ExploredArea = mongoose.model("ExploredArea", exploredAreaSchema);
module.exports = { ExploredArea };
