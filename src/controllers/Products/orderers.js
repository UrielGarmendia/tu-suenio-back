const db = require("../../db");

const getProductsAlphabeticallyAsc = async () => {
    try {
      const products = await db.Product.findAll({
        order: [['name', 'ASC']],
      });
      return products;
    } catch (error) {
      throw error;
    }
};

const getProductsAlphabeticallyDesc = async () => {
    try {
      const products = await db.Product.findAll({
        order: [['name', 'DESC']],
      });
      return products;
    } catch (error) {
      throw error;
    }
};

const getProductsByPriceAsc = async () => {
    try {
      const products = await db.Product.findAll({
        order: [['price', 'ASC']],
      });
      return products;
    } catch (error) {
      throw error;
    }
};

const getProductsByPriceDesc = async () => {
    try {
      const products = await db.Product.findAll({
        order: [['price', 'DESC']],
      });
      return products;
    } catch (error) {
      throw error;
    }
};

module.exports = {
  getProductsAlphabeticallyAsc,
  getProductsAlphabeticallyDesc,
  getProductsByPriceAsc,
  getProductsByPriceDesc,
};
