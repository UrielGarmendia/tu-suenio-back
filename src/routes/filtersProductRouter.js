const express = require("express");
const router = express.Router();

const { getProductsByCategory, getProductsBySize, getProductsByCategoryAndSize } = require("../controllers/Products/filters");

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

router.get("/combined/:categoryId/:size", async (req, res) => {
  const { categoryId, size } = req.params; // Obtén los valores de categoryId y size desde los parámetros de consulta (query parameters)

  try {
    let products;

    if (categoryId && size) {
      // Si se proporcionan tanto categoryId como size, realiza una búsqueda combinada
      products = await getProductsByCategoryAndSize(categoryId, size);
    } else {
      // Si no se proporcionan ni categoryId ni size, devuelve un mensaje de error
      return res.status(400).json({ message: "Debe proporcionar al menos un filtro (categoryId o size)." });
    }

    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos que coincidan con los filtros proporcionados." });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos." });
  }
});

module.exports = router;
