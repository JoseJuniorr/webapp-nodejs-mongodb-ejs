const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const moment = require("moment");
moment.locale("pt-br");
const flash = require("connect-flash");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");

//express
const app = express();

//passport strategy
require("./config/auth");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Connect to database
require("./database/connection");

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//method override
app.use(methodOverride("_method"));

//Express Session
app.use(cookieParser());
app.use(
  session({
    secret: "secret-site",
    resave: true,
    saveUninitialized: true,
  })
);

//Flash messages
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

app.use("/", require("./routes/home.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/adm", require("./routes/adm.routes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
