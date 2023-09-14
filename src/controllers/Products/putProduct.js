const db = require("../../db");

const putProduct = async (productId, updatedProductData) => {
    try {
      const product = await db.Product.findByPk(productId);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }
  
      await product.update(updatedProductData);
  
      return product;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = putProduct;