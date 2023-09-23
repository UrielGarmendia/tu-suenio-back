const { Review } = require("../../db");

const modifyReview = async (id, updateReview) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.update(updateReview);
    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  modifyReview,
};
