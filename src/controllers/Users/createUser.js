const db = require("../../db");
const path = require("path");
const { sendRegistrationEmail } = require("../../utils/nodemailer");
const defaultImageUrl = path.resolve("public/default-user");

module.exports = async (userData) => {
  const { email, phone, password, name, address } = userData;
  try {
    const newUser = await db.User.create({
      name,
      email,
      password,
      phone,
      address,
      image: defaultImageUrl,
    });

    sendRegistrationEmail(newUser.id);

    return newUser;
  } catch (error) {
    // console.error(error);
    throw new Error("Error al crear un usuario");
  }
};
