var express = require("express");
var router = express.Router();
var { body } = require("express-validator");
var controller = require("../controllers/auth");

/* GET login */
router.get("/login", controller.login_get);

/* POST login */
router.post("/login", controller.login_post);

/* GET logout */
router.get("/logout", controller.logout);

/* GET signup */
router.get("/signup", controller.signup_get);

/* POST signup */
router.post(
  "/signup",
  [
    body("firstname").isString().isLength({ min: 1, max: 255 }),
    body("lastname").isString().isLength({ min: 1, max: 255 }),
    body("email").isEmail().isLength({ min: 1, max: 255 }),
    body("password").isString().isLength({ min: 1, max: 255 }),
  ],
  controller.signup_post
);

module.exports = router;