const express = require('express');
const router = express.Router();

const { getProductsByCategory } = require('../controllers/Products/filters');

router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
  
    try {
        // console.log("controlador en la ruta", productController);
      const products = await getProductsByCategory(categoryId);
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos en esta categoría.' });
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener productos por categoría.' });
    }
  });
  
  module.exports = router;