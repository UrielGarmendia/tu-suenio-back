const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Size",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
          },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
          },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
          },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
          },
        })
    };
