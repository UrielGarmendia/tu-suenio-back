const server = require("./src/app");
const { conn } = require("./src/db");

// ¡Cambiar { force: true } a { force: false } para evitar re-crear la base de datos en cada inicio!
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("Funcionando en http://localhost:3001");
  });
});
