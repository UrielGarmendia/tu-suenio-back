const db = require("../../db");

module.exports = async (id) => {
  const userToDestroy = await db.User.findByPk(id);
  await userToDestroy.destroy();
  return userToDestroy;
};
