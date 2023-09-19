const { User } = require("../../db");

const getAdmins = async () => {
  const admins = await User.findAll({
    where: {
      isAdmin: true,
    },
  });
  if (!admins) {
    throw new Error("No se encontraron admins");
  }
  return admins;
};

module.exports = {
  getAdmins,
};
