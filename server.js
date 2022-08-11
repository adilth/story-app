const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const index = require("./routes/index");
//load config
require("dotenv").config({ path: "./config/config.env" });

//loaging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//handlebars
app.engine("handlebars", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

//static folder
app.use(express.static("public"));

// routes
app.use("/", index);
const PORT = process.env.PORT || 3001;

connectDB();
app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
