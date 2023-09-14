// Conexion a JSON
// const fs = require("fs");
// const path = require("path");
// const archivoJson = path.resolve("api/db.json");

// const readUsersFromJson = async (filePath, id) => {
//   const data = await fs.readFileSync(filePath, "utf-8");
//   const json = JSON.parse(data);

//   const exists = await fs.existsSync(filePath);

//   if (exists) {
//     const users = json.users.filter((user) => user.id === id);

//     if (users) {
//       return users;
//     } else {
//       return console.log("No existe");
//     }
//   } else {
//     return console.log("No existe");
//   }
// };

// module.exports = async () => {
//   const id = 1; // Cambiar este valor por el id del usuario que quieres buscar
//   const users = await readUsersFromJson(archivoJson, id);
//   if (!users) throw new Error("User not found");
//   return users;
// };

//Conexion a la database
const db = require("../../db");

module.exports = async (id) => {
  try {
    const user = await db.User.findByPk(id, {
      include: [
        {
          model: db.Order,
        },
        {
          model: db.Review,
        },
      ],
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar el usuario");
  }
};
