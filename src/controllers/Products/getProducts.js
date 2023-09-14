const db = require("../../db");
const { Op } = require('sequelize');

const getProducts = async (name) => {
  const products = name
    ? await db.Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      })
    : await db.Product.findAll();

  if (!products.length) throw new Error("Products not found");

  return products;
};

module.exports = getProducts;