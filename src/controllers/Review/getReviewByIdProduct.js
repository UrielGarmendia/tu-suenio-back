const { Review, User } = require("../../db");

const getReviewByIdProduct = async (id) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: id },
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    if (!reviews) {
      throw new Error("No se encontraron reviews para este producto");
    }

    return reviews;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getReviewByIdProduct,
};