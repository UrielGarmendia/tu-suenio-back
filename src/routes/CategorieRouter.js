const { Router } = require("express");
const {
  getAllCategorie,
  getCategorieByName,
  createCategorie,
  deleteCategorie,
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

router.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const createDb = await createCategorie(name);
    res.status(200).json(createDb);
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategorie(id);
    res.status(200).json({ message: "Categorie borrado con exito" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al borrar la Categorie" });
  }
});

module.exports = router;
