// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./src/swagger.json');
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

require("./src/connections/mongodb-atlas");

const app = express();
const port = process.env.PORT || 8000;
const configRoute = require("./src/apis/index");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/*", (req, res, next) => {
  res.set({
    "Access-Control-Expose-Headers": "Content-Range",
    "Content-Range": "1-2*",
    "X-Total-Count": "30",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  });
  next();
});

configRoute(app);

app.listen(port, () => {
  console.log(`Server is up in port + ${port}`);
});

/*
 */
