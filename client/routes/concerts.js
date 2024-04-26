var express = require("express");
var router = express.Router();
var { body } = require("express-validator");
var controller = require("../controllers/concert");

/* GET concert listing. */
router.get("/", controller.concerts_list);

/* GET concerts add */
router.get("/add", controller.concerts_create_get);

/* POST concerts add */
router.post(
  "/add",
  [
    body("title").trim().not().isEmpty().withMessage("Title must not be empty"),
    body("city").trim().not().isEmpty().withMessage("City must not be empty"),
    body("date").trim().not().isEmpty().withMessage("Date must not be empty"),
    body("price").trim().not().isEmpty().withMessage("Pricing must not be empty")
      .isFloat({ decimalSeparator: "." }).withMessage("Please enter a valid float number for pricing: 12.34"),
  ],controller.concerts_create_post);

/* GET a concert */
router.get("/:uuid", controller.concerts_detail);

/* DELETE concerts */
router.get("/:uuid/delete", controller.concerts_delete);

/* GET concerts edit */
router.get("/:uuid/edit", controller.concerts_edit_get);

/* POST concerts edit */
router.post(
  "/:uuid/edit",
  [
    body("title").trim().not().isEmpty().withMessage("Title must not be empty"),
    body("city").trim().not().isEmpty().withMessage("City must not be empty"),
    body("date").trim().not().isEmpty().withMessage("Date must not be empty"),
    body("price")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Pricing must not be empty")
      .isFloat({ decimalSeparator: "," })
      .withMessage("Please enter a valid float number for pricing: 12,34"),
  ],
  controller.concerts_edit_put
);

module.exports = router;
