// server/routes/reviews.js
const router = require("express").Router();
const { Review } = require("../models/review");
const verifyToken = require("../middleware/verifyToken"); // ← без {}

router.post("/", verifyToken, async (req, res) => {
  try {
    const { cafeId, rating, comment } = req.body;

    console.log("📥 Запит на створення відгуку");
    console.log("Тіло запиту:", req.body);
    console.log("req.user:", req.user);

    if (!req.user || !req.user._id) {
      console.log("❌ Немає user._id у токені");
      return res.status(400).json({ error: "Немає користувача в токені" });
    }

    if (!cafeId || !rating) {
      console.log("❌ Відсутні обов'язкові поля (cafeId, rating)");
      return res.status(400).json({ error: "Неповні дані для збереження" });
    }

    const newReview = new Review({
      userId: req.user._id,
      cafeId,
      rating,
      comment,
    });

    await newReview.save();
    console.log("✅ Відгук збережено успішно");
    res.status(201).json({ message: "Відгук збережено" });
  } catch (error) {
    console.error("❌ Помилка збереження відгуку:", error);
    res.status(500).json({ error: "Помилка збереження відгуку" });
  }
});

router.get("/:cafeId", async (req, res) => {
  try {
    const reviews = await Review.find({ cafeId: req.params.cafeId }).populate("userId", "firstName lastName");
    res.status(200).send(reviews);
  } catch (err) {
    console.error("Помилка отримання відгуків:", err);
    res.status(500).send({ message: "Не вдалося отримати відгуки" });
  }
});

router.get("/my", verifyToken, async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const userObjectId = new mongoose.Types.ObjectId(req.user._id);

    const reviews = await Review.find({ userId: userObjectId })
      .populate("cafeId", "name location"); // додає назву кав’ярні
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати відгуки користувача" });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "firstName lastName")
      .populate("cafeId", "name location");
    res.status(200).send(reviews);
  } catch (err) {
    console.error("Помилка отримання всіх відгуків:", err);
    res.status(500).send({ message: "Не вдалося отримати всі відгуки" });
  }
});


module.exports = router;
