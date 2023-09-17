const db = require("../../db");

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await db.Product.findAll({
      where: { id_categorie: categoryId },
      include: {
        model: db.Categorie,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    console.log("Controlador de filtros importado correctamente.");
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductsByCategory };
