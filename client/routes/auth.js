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
    body("firstname").trim().not().isEmpty().withMessage("First name must not be empty"),
    body("lastname").trim().not().isEmpty().withMessage("Last name must not be empty"),
  ],
  controller.signup_post
);

module.exports = router;