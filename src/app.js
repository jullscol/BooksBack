const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
require("./db.js");
const cors = require("cors");
//cambio para aprobar bloqueo de main
const server = express();
//hola aca estoy
// segunda vuelta
server.name = "API";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// const sendWelcomeRoute = require('../src/routes/SendWelcome.js');
// server.use('/', sendWelcomeRoute); 

// const sendCompraRoute = require('../src/routes/SendCompra.js');
// server.use('/', sendCompraRoute); 

server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://wondertoys.up.railway.app" /*http://localhost:3000"*/
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
// test of branch of developer
// test of branch of developer doublecheck

module.exports = server;
