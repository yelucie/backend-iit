var express = require("express");
var router = express.Router();
var { body } = require("express-validator");
var controller = require("../controllers/artist");

/* GET artist listing. */
router.get("/", controller.artists_list);

/* GET artists add */
router.get("/add", controller.artists_create_get);

/* POST artists add */
router.post(
  "/add",
  [
    body("artistname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty"),
  ],
  controller.artists_create_post
);

/* GET a artist */
router.get("/:uuid", controller.artists_detail);

/* DELETE artists */
router.get("/:uuid/delete", controller.artists_delete);

/* GET artists edit */
router.get("/:uuid/edit", controller.artists_edit_get);

/* POST artists edit */
router.post(
  "/:uuid/edit",
  [
    body("artistname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty"),
  ],
  controller.artists_edit_put
);

module.exports = router;
