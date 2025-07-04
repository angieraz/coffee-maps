const router = require("express").Router();
const { Cafe } = require("../models/cafe");
const auth = require("../routes/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name, location } = req.body;

    const cafe = new Cafe({
      userId: req.user._id,
      name,
      location
    });

    await cafe.save();
    res.status(201).send(cafe);
  } catch (err) {
    res.status(500).send({ message: "Не вдалося зберегти кав'ярню" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const cafes = await Cafe.find({ userId: req.user._id });
    res.status(200).send(cafes);
  } catch (err) {
    res.status(500).send({ message: "Не вдалося отримати кав'ярні" });
  }
});

module.exports = router;
