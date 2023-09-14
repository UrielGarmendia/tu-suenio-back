const { Router } = require("express");
const {
  getAllCategorie,
  getCategorieByName,
  createCategorie,
} = require("../controllers/Categorie/CategorieController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const categories = name
      ? await getCategorieByName(name)
      : await getAllCategorie();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const categorieId = await getAllCategorie();
    const searchId = categorieId.filter((c) => c.id == id);

    res.status(200).json(searchId);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const createDb = await createCategorie(name);
    res.status(200).json(createDb);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

module.exports = router;
