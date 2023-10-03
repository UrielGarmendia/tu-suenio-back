const db = require("../../db");
const path = require("path");
const { sendRegistrationEmail } = require("../../utils/nodemailer");
const defaultImageUrl = path.resolve("public/default-user");

module.exports = async (userData) => {
  const { name, lastName, email, dni, address, image, phone, sub } = userData;
  try {
    const createUser = {
      name,
      email,
      image,
      sub,
    };
    if (lastName) createUser.lastName = lastName;
    if (dni) createUser.dni = dni;
    if (address) createUser.address = address;
    if (phone) createUser.phone = phone;

    const newUser = await db.User.create(createUser);
    return newUser;

    // sendRegistrationEmail(newUser.id);
  } catch (error) {
    // console.error(error);
    throw new Error("Error al crear un usuario");
  }
};
