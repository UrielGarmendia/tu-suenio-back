const db = require("../../db");

const getProductById = async () => {
  try {
    const product2 = await db.Product.findAll({
      include: {
        model: db.Categorie,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!product2) {
      throw new Error("Producto no encontrado");
    }

    return product2;
  } catch (error) {
    throw error;
  }
};

module.exports = getProductById;
