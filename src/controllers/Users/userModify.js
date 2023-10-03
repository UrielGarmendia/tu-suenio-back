const db = require("../../db");

const modifyUser = async (id, updateUser) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(updateUser);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  modifyUser,
};
