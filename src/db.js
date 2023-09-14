require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const CategorieModel = require("./models/Categorie");
const OrderModel = require("./models/Order");
const ProductModel = require("./models/Product");
const ReviewModel = require("./models/Review");
const UserModel = require("./models/User");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

CategorieModel(sequelize);
OrderModel(sequelize);
ProductModel(sequelize);
ReviewModel(sequelize);
UserModel(sequelize);

const { Categorie, Order, Product, Review, User } = sequelize.models;

Categorie.belongsToMany(Product, {
  through: "ProductCategorie",
  timestamps: false,
});

Product.belongsToMany(Categorie, {
  through: "ProductCategorie",
  timestamps: false,
});

Order.belongsToMany(Product, {
  through: "OrderProduct",
  timestamps: false,
});

Product.belongsToMany(Order, {
  through: "OrderProduct",
  timestamps: false,
});

Review.belongsTo(Product);
Product.hasMany(Review);
Review.hasOne(User);
User.hasMany(Review);
Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
