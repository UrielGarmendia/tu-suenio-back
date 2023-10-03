const { Review, User, Product } = require("../../db");

const createReview = async (comment, rating, userId, productId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User no encontrado");
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product no encontrado");

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    throw new Error("Rating debe ser un número entre 1 y 5");
  }

  const newReview = await Review.create({ comment, rating, userId, productId });
  if (!newReview) throw new Error("No se pudo crear una review");
  newReview.setDataValue("userName", user.name)
  
  return newReview;
};

module.exports = { createReview };