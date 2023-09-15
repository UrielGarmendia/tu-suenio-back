const { Product } = require("../../db");

const getProductsByCategory = async (categorieId) => {
  try {
    const products = await Product.findAll({
      where: { categorieId },
    });
    console.log(categoryId);
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductsByCategory };
