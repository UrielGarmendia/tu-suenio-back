const { Router } = require("express");
const jsonRutas = require("../utils/rutas.json");
const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(jsonRutas);
  } catch (error) {
    res.status(400).json({ message: "Error ruta de las rutas" });
  }
});

module.exports = router;
