const db = require("../../db");
const { Op } = require("sequelize");

const getProducts = async (name) => {
  const products = name
    ? await db.Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: db.Categorie,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      })
    : await db.Product.findAll({
        include: {
          model: db.Categorie,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

  if (!products.length) throw new Error("Products not found");

  return products;
};

module.exports = getProducts;
