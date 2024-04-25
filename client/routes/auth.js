var express = require("express");
var router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const jwtAccessSecret = process.env.ACCESS_SECRET;

/* GET login form. */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/* POST login form. */
router.post("/login", async function (req, res, next) {
  const admin = await Admin.findOne({ email: req.body.email }).exec();
  if (!admin) return res.redirect("/login");

  const token = jwt.sign({ email: req.body.email }, jwtAccessSecret, {
    expiresIn: "30m",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.send(`Psst, your current token is ${token}`);
});

/* GET logout. */
router.get("/logout", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/login");
});

/* GET signup form. */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

/* POST signup form. */
router.post("/signup", async function (req, res, next) {
  const admin = new Admin({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  let save = await admin.save();
  req.login(save, function (err) {
    if (err) return next(err);
    return res.send("Registered");
  });
});

module.exports = router;