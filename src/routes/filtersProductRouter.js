const express = require("express");
const router = express.Router();

const { getProductsByCategory } = require("../controllers/Products/filters");
const { getProductsBySize } = require('../controllers/Products/filters');

router.get("/categorie/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  try {
    // console.log("controlador en la ruta", productController);
    const products = await getProductsByCategory(categoryId);

    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos en esta categoría." });
    }
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos por categoría." });
  }
});

router.get('/size/:size', async (req, res) => {
  const { size } = req.params;

  try {
    const products = await getProductsBySize(size);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos en este tamaño.' });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos por tamaño.' });
  }
});

module.exports = router;
