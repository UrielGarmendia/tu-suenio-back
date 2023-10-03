const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    timestamps: DataTypes.DATE,
  });
};
