const db = require("../../db");

module.exports = async (id) => {
  let user = await db.User.findByPk(id);

  if (!user) throw new Error("User not found");

  if (!user.isDisable) throw new Error("User is already active");

  user.isDisable = false;

  await user.save();
};
