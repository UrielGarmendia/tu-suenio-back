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

const getProductsBySize = async (size) => {
  try {
    const products = await db.Product.findAll({
      where: { size },
      include: {
        model: db.Categorie,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductsByCategoryAndSize = async (categoryId, size) => {
  try {
    const products = await db.Product.findAll({
      where: { id_categorie: categoryId, size },
      include: {
        model: db.Categorie,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductsByCategory,
  getProductsBySize,
  getProductsByCategoryAndSize,
};
