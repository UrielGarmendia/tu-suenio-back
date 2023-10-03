const { Review, User } = require("../../db");

const getReviewsByUserName = async (userName) => {
  try {
    const user = await User.findOne({
      where: {
        name: userName,
      },
      include: {
        model: Review,
      },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user.Reviews; // Con esto devuelve todas las reviews asociadas al usuario encontrado
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getReviewsByUserName,
};

