const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrderProduct', {
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
