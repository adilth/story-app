const express = require("express");
const app = express();
const morgon = require("morgon");
const connectDB = require("./config/db");
//load config
require("dotenv").config({ path: "./config/config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}
const PORT = process.env.PORT;

connectDB();
app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
