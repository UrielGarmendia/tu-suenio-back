const server = require("./src/app");
const { conn } = require("./src/db");

// ! Despues de terminar la db pasar a alter: true
conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log("funcionando en el http://localhost:3001");
  });
});
