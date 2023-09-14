const db = require("../../db");

const getProductById = async (productId) => {
  try {
    const product = await db.Product.findByPk(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = getProductById;