const db = require("../../db");

module.exports = async (name, password, email) => {
  try {
    let userToLogin;

    if (email) {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      userToLogin = user;
    } else if (name) {
      const user = await db.User.findOne({
        where: {
          name,
        },
      });
      userToLogin = user;
    }

    if (!userToLogin) throw new Error("The user isn't registered");

    if (password) {
      const validPassword = password === userToLogin.password;

      if (!validPassword)
        throw new Error("The password or username/email/phone are incorrect");
    }

    return userToLogin;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
