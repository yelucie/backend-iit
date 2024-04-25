const { validationResult } = require("express-validator");
const concerts = require("../api/concert");
const cat = require("../api/cat");

/* GET concerts listing. */
exports.concerts_list = async function (req, res, next) {
  await concerts.findAll().then((concerts) => {
    res.render("concerts", { title: "List of concerts", concerts: concerts });
  });
};

/* GET concerts add */
exports.concerts_create_get = function (req, res, next) {
  res.render("concerts_input", { title: "Add a new concert" });
};

/* POST concerts add */
exports.concerts_create_post = async function (req, res, next) {
  var newConcert = {
    title: req.body.title,
    city: req.body.city,
    date: req.body.date,
    price: req.body.price,
    artist: req.body.artist,
  };

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.render("concerts_input", {
      title: "Add a new concert",
      newConcert: true,
      concert: newConcert,
      msg: result.array(),
    });
  } else {
    await concerts.create(newConcert).then(() => {
      res.redirect("/concerts");
    });
  }
};

/* GET a concert */
exports.concerts_detail = async function (req, res, next) {
  var catFact = "A random cat fact will appear here.";
  catFact = await cat.getRandomCatFact();

  await concerts.findById(req.params.uuid).then((concert) => {
    res.render("concert", {
      title: concert.title,
      concert,
      catFact
    });
  });
};

/* DELETE concerts */
exports.concerts_delete = async function (req, res, next) {
  await concerts.deleteById(req.params.uuid).then(() => {
    res.redirect("/concerts");
  });
};

/* GET concerts edit */
exports.concerts_edit_get = async function (req, res, next) {
  await concerts.findById(req.params.uuid).then((concert) => {
    res.render("concerts_input", {
      title: `Edit ${concert.title}`,
      concert: concert,
    });
  });
};

/* POST concerts edit */
exports.concerts_edit_put = async function (req, res, next) {
  var updatedConcert = {
    _id: req.params.uuid,
    title: req.body.title,
    city: req.body.city,
    date: req.body.date,
    price: req.body.price,
    artist: req.body.artist,
  };
  var genreid = req.body.genreid;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    await concerts.findById(req.params.uuid).then((concert) => {
      res.render("concerts_input", {
        title: `Edit ${concert.title}`,
        newConcert: false,
        concert: concert,
        msg: result.array(),
      });
    });
  } else {
    await concerts.update(updatedConcert, genreid).then(() => {
      res.redirect("/concerts");
    });
  }
};
