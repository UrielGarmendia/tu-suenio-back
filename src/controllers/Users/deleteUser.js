const db = require("../../db");

module.exports = async (id) => {
  let user = await db.User.findByPk(id);
  console.log(user);
  if (!user) throw new Error("Usuario no encontrado");

  if (user.isDisable) throw new Error("El usuario ya está desactivado");
  user.isDisable = true;
  await user.save();
  return console.log("Usuario borrado");
};
