const { Review } = require("../../db");

const deleteReview = async (id) => {
  const review = await Review.findByPk(id);
  if (!review) throw new Error("No se encontro review con ese id");
  await review.destroy();
};

module.exports = {
  deleteReview,
};
