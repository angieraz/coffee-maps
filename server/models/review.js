const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cafeId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
