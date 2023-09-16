const express = require("express");
const router = express.Router();

const {
  getProductsAlphabeticallyAsc,
  getProductsAlphabeticallyDesc,
  getProductsByPriceAsc,
  getProductsByPriceDesc,
} = require("../controllers/Products/orderers");

// Ruta para obtener todos los productos ordenados alfabéticamente de forma ascendente
router.get("/alp-asc", async (req, res) => {
  try {
    const products = await getProductsAlphabeticallyAsc();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "zz" });
  }
});

// Ruta para obtener todos los productos ordenados alfabéticamente de forma descendente
router.get("/alp-desc", async (req, res) => {
  try {
    const products = await getProductsAlphabeticallyDesc();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "zzz" });
  }
});

// Ruta para obtener todos los productos ordenados por precio de forma ascendente
router.get("/price-asc", async (req, res) => {
  try {
    const products = await getProductsByPriceAsc();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "zzzz" });
  }
});

// Ruta para obtener todos los productos ordenados por precio de forma descendente
router.get("/price-desc", async (req, res) => {
  try {
    const products = await getProductsByPriceDesc();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "zzzzzz" });
  }
});

module.exports = router;
