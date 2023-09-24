const db = require("../../db");

module.exports = async (sub) => {
  try {
    const user = await db.User.findOne({
      where: {
        sub,
      },
    });
    if (!user) throw new Error("Usuario no encontrado");
    else {
      return user
    }
  } catch (error) {
    console.error('Error en la función de búsqueda de usuario:', error);
    return { error: error.message }
  }
  // try {
  //   let userToLogin;

  //   if (email) {
  //     const user = await db.User.findOne({
  //       where: {
  //         email,
  //       },
  //     });
  //     userToLogin = user;
  //   } else if (name) {
  //     const user = await db.User.findOne({
  //       where: {
  //         name,
  //       },
  //     });
  //     userToLogin = user;
  //   }

  //   if (!userToLogin) throw new Error("The user isn't registered");

  //   if (password) {
  //     const validPassword = password === userToLogin.password;

  //     if (!validPassword)
  //       throw new Error("The password or username/email/phone are incorrect");
  //   }

  //   return userToLogin;
  // } catch (error) {
  //   return {
  //     error: error.message,
  //   };
  // }
};
