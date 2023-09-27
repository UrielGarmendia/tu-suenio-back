const { Review, User, Product } = require("../../db");

const createReview = async (comment, userId, productId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User no encontrado");
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product no encontrado");
  const newReview = await Review.create({ comment, userId, productId });
  if (!newReview) throw new Error("No se pudo crear una review");
  return newReview;
};

module.exports = { createReview };
