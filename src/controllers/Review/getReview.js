const { Review, User } = require("../../db");

const getAllReview = async () => {
  const reviews = await Review.findAll({
    include: {
      model: User,
      attributes: ["name"]
    }
  });
  if (!reviews) throw new Error("No se encontraron reviews");
  return reviews;
};

module.exports = { getAllReview };
