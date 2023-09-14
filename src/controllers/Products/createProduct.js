const db = require("../../db.js");
const { Product } = db;

const createProduct = async (newProductData) => {
  try {
    const newProduct = await Product.create(newProductData);

    return newProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = createProduct;