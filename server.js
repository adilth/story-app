const express = require("express");
const app = express();
const morgon = require("morgon");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");
const index = require("./routes/index");
//load config
require("dotenv").config({ path: "./config/config.env" });

//loaging
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

//handlebars
app.engine("handlebars", engine({ extname: ".hbs" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// routes
app.use("/", index);
const PORT = process.env.PORT;

connectDB();
app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
