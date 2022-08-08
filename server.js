const express = require("express");
const app = express();

//load config
require("dotenv").config({ path: "./config/config.env" });
const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
