const db = require("../../db");

module.exports = async () => {
  const allUsers = await db.User.findAll();

  if (!allUsers.length) throw new Error("Users not found");

  return allUsers;
};

// Buscar en el JSON
// const fs = require("fs");
// const path = require("path");
// const archivoJson = path.resolve("api/db.json");

// const readUsersFromJson = async (filePath) => {
//   const data = await fs.readFileSync(filePath, "utf-8");
//   const json = JSON.parse(data);

//   const exists = await fs.existsSync(filePath);

//   if (exists) {
//     console.log(json.users);
//     return json.users;
//   } else {
//     return console.log("No existe");
//   }
// };

// module.exports = async () => {
//   const allUsers = await readUsersFromJson(archivoJson); //cambiar a la de base de datos
//   if (!allUsers.length) throw new Error("Users not found");
//   return allUsers;
// };
