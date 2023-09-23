const { Review } = require("../../db");

const getReviewByIdProduct = async (id) => {
  const getReview = await Review.findAll({ where: { productId: id } });
  if (!getReview) throw new Error("No se encontro con ese Id");
  return getReview;
};

module.exports = {
  getReviewByIdProduct,
};
