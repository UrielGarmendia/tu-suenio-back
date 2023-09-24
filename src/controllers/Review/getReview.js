const { Review } = require("../../db");

const getAllReview = async () => {
  const reviews = await Review.findAll();
  if (!reviews) throw new Error("No se encontraron reviews");
  return reviews;
};

module.exports = { getAllReview };
