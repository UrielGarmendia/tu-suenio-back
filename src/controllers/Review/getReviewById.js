const { Review } = require("../../db");

const getReviewById = async (id) => {
  const getReview = await Review.findAll({ where: { userId: id } });
  if (!getReview) throw new Error("No se encontro con ese Id");
  return getReview;
};

module.exports = {
  getReviewById,
};
