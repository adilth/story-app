const express = require("express");
const app = express();
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const index = require("./routes/index");
const authroute = require("./routes/auth");
const storyRoute = require("./routes/stories");
//load config
require("dotenv").config({ path: "./config/config.env" });

//loaging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const {
  formatData,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

//passport config

require("./config/passport")(passport);
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method overwrite
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
//handlebars
app.engine(
  "handlebars",
  engine({
    helpers: { formatData, stripTags, truncate, editIcon, select },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

//sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//static folder
app.use(express.static("public"));

// routes
app.use("/", index);
app.use("/auth", authroute);
app.use("/stories", storyRoute);

const PORT = process.env.PORT || 3001;

connectDB();
app.listen(
  PORT,
  console.log(`server is connect in ${process.env.NODE_ENV} mode ${PORT}`)
);
