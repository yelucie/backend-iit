var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var jwtAuth = require("./middleware/jwtAuth");
var session = require("express-session");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

var indexRouter = require("./routes/index");
var concertsRouter = require("./routes/concerts");
var artistsRouter = require("./routes/artists");
var auth = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(jwtAuth);
app.use(
  session({
    secret: "A session for the backend lab",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  req.session.navigationHistory = req.session.navigationHistory || [];
  req.session.navigationHistory.push(req.originalUrl);
  next();
});

app.use("/", indexRouter);
app.use("/concerts", concertsRouter);
app.use("/artists", artistsRouter);
app.use("/", auth);

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
