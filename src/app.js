const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
require("./db");

const server = express();

server.use(morgan());
server.use(cors());

server.use("/", routes);

module.exports = server;
