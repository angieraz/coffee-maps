const router = require("express").Router();
const { ExploredArea } = require("../models/exploredArea");
const auth = require("../routes/auth");

router.post("/", auth, async (req, res) => {
  const { coordinates } = req.body;
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
    return res.status(400).send({ message: "Відсутні або некоректні координати" });
  }
  try {
    const updated = await ExploredArea.findOneAndUpdate(
      { userId: req.user._id },
      { coordinates, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).send(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Помилка сервера" });
  }
});

module.exports = router;
