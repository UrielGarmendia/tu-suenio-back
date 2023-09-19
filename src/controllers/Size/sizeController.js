const { Size } = require("../../db");

const getAllSize = async () => {
  const size = await Size.findAll();
  return size;
};

const getSizeByName = async (name) => {
  if (name !== "") {
    const searchName = await Size.findAll({
      where: { name: name },
    });
    return searchName;
  } else {
    return "Name no puede ser vacio";
  }
};

const createSize = async (name, stock, price) => {
  const create = await Size.create({ name, stock, price });
  return create;
};

module.exports = {
  getAllSize,
  getSizeByName,
  createSize,
};