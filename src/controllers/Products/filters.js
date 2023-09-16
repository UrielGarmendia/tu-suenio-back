const { Product } = require("../../db");

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await Product.findAll({
      where: { id_categorie: categoryId },
    });
    console.log("Controlador de filtros importado correctamente.");
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductsByCategory };