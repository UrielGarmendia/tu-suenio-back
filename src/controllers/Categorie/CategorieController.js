const { Categorie } = require("../../db");

const getAllCategorie = async () => {
  const categorie = await Categorie.findAll();
  return categorie;
};

const getCategorieByName = async (name) => {
  if (name !== "") {
    const searchName = await Categorie.findAll({
      where: { name: name },
    });
    return searchName;
  } else {
    return "Name no puede ser vacio";
  }
};

const createCategorie = async (name) => {
  const create = await Categorie.create({ name });
  return create;
};

module.exports = {
  getAllCategorie,
  getCategorieByName,
  createCategorie,
};
