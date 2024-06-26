const { validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const jwtAccessSecret = process.env.ACCESS_SECRET;

/* GET login form. */
exports.login_get = async function (req, res, next) {
  if(req.cookies.jwt) redirect(res, req, next);
  const msg = req.session.message;
  req.session.message = null;
  console.log(msg);
  res.render("login", { msg: msg });
};

/* POST login form. */
exports.login_post = async function (req, res, next) {
  const admin = await Admin.findOne({ email: req.body.email }).exec();
  if (!admin) {
    req.session.message = "Invalid email or password";
    return res.redirect("/login");
  }

  const isPasswordMatch = await admin.matchPassword(req.body.password);
  if (!isPasswordMatch) {
    req.session.message = "Invalid email or password";
    return res.redirect("/login");
  }

  const token = jwt.sign({ email: req.body.email }, jwtAccessSecret, {
    expiresIn: "15m",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
  });

  redirect(req, res, next);
};

/* GET logout. */
exports.logout = function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect(req.get("referer"));
};

/* GET signup form. */
exports.signup_get = function (req, res, next) {
  if(req.cookies.jwt) return redirect(res, req, next);
  res.render("signup");
};

/* POST signup form. */
exports.signup_post = async function (req, res, next) {
  const admin = new Admin({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    res.render("signup", {
      admin: admin,
      msg: result.array(),
    });
  } else {
    await Admin.create(admin);
    const token = jwt.sign({ email: req.body.email }, jwtAccessSecret, {
      expiresIn: "15m",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });

    redirect(req, res, next);
  }
};

redirect = function (req, res, next) {
  const navigationHistory = req.session.navigationHistory || [];
  let previousPage = "/";
  for (let i = navigationHistory.length - 1; i >= 0; i--) {
    if (navigationHistory[i] !== "/login" && navigationHistory[i] !== "/signup") {
      previousPage = navigationHistory[i];
      break;
    }
  }
  res.redirect(previousPage);
};
