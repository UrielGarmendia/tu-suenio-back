const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductCategorie', {
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
