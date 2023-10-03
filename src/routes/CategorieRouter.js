const { Router } = require("express");
const {
  getAllCategorie,
  getCategorieByName,
  createCategorie,
  deleteCategorie,
  putCategorie,
} = require("../controllers/Categorie/CategorieController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const categories = name
      ? await getCategorieByName(name)
      : await getAllCategorie();
    if (!categories) {
      throw new Error("Categorie not found");
    }
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCategorieData = req.body;
  try {
    const categorie = await putCategorie(id);
    if (!categorie) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    await categorie.update(updatedCategorieData);
    res.json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la categoria" });
  }
});

module.exports = router;
