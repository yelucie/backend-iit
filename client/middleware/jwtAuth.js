var jwt = require("jsonwebtoken");

function jwtAuth(req, res, next) {
  const cookieSplit = String(req.headers.cookie).split("; ");
  const cookie = {};

  for (const str of cookieSplit) {
    const [key, value] = str.split("=");
    cookie[key] = value;
  }
  const token = cookie["jwt"];

  if (token == null || token === "") {
    req.isAuth = false;
    return next();
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      req.isAuth = false;
      return next();
    }
    req.isAuth = true;
    req.user = user;
    next();
  });
}

module.exports = jwtAuth;