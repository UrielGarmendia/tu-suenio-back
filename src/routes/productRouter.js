const express = require("express");
const router = express.Router();
const fs = require("fs");
const createProduct = require("../controllers/Products/createProduct");
const getProduct = require("../controllers/Products/getProductById");
const getProducts = require("../controllers/Products/getProducts");
const putProduct = require("../controllers/Products/putProduct");
const deleteProduct = require("../controllers/Products/deleteProductById");
const destroyProduct = require("../controllers/Products/destroyProduct");

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const products = name ? await getProducts(name) : await getProducts();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un producto por ID
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await getProduct();
    // if (!product) {
    //   return res.status(404).json({ message: "Producto no encontrado" });
    // }
    const allProducts = await product.filter((p) => p.id == productId);
    allProducts.length
      ? res.status(200).json(allProducts)
      : res.status(400).json({ message: "error producto ruta" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

// Ruta para actualizar un producto por ID
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  try {
    const product = await putProduct(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update(updatedProductData);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// Ruta para crear un nuevo producto
router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const filePath = data.image ?? req.files.image.tempFilePath;

    const newProduct = await createProduct(data, filePath);

    if (!data.image) {
      await fs.unlink(filePath);
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
});

// Ruta para eliminar un producto por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al eliminar un producto" });
  }
});

// Ruta para eliminar definitivamente de la DB
router.delete("/destroy/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await destroyProduct(id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error al eliminar un producto" });
  }
});

module.exports = router;
