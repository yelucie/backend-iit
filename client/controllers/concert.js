const { validationResult } = require("express-validator");
const concerts = require("../api/concert");
const artists = require("../api/artist");
const cities = require("../api/city");
const weather = require("../api/weather");

/* GET concerts listing. */
exports.concerts_list = async function (req, res, next) {
  await concerts.findAll().then((concerts) => {
    res.render("concerts", {
      title: "List of concerts",
      concerts: concerts,
      token: req.cookies.jwt,
    });
  });
};

/* GET concerts add */
exports.concerts_create_get = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || "")) return res.redirect("/login");

  const citiesArray = await cities.getCities();

  await artists.findAll().then((artists) => {
    res.render("concerts_input", {
      title: "Add a new concert",
      artists: artists,
      token: req.cookies.jwt,
      cities: citiesArray,
    });
  });
};

/* POST concerts add */
exports.concerts_create_post = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || "")) return res.redirect("/login");

  var newConcert = {
    title: req.body.title,
    city: req.body.city,
    date: req.body.date,
    price: req.body.price,
    artistid: req.body.artist,
    genreid: "",
  };

  const result = validationResult(req);
  if (!result.isEmpty()) {
    await artists.findAll().then((artists) => {
      res.render("concerts_input", {
        title: "Add a new concert",
        newConcert: true,
        concert: newConcert,
        artists: artists,
        token: req.cookies.jwt,
        msg: result.array(),
      });
    });
  } else {
    await concerts.create(newConcert).then(() => {
      res.redirect("/concerts");
    });
  }
};

/* GET a concert */
exports.concerts_detail = async function (req, res, next) {
  try {
  const concert = await concerts.findById(req.params.uuid);
  const weatherForCity = await weather.getWeather(concert.city);
  res.render("concert", {
      title: concert.title,
      concert,
      token: req.cookies.jwt,
      weather: weatherForCity,
    });
  }
  catch (error) {
    res.status(500).send("Internal Server Error");
};
};

/* DELETE concerts */
exports.concerts_delete = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  await concerts.deleteById(req.params.uuid).then(() => {
    res.redirect("/concerts");
  });
};

/* GET concerts edit */
exports.concerts_edit_get = async function (req, res, next) {
  console.log(req);
  if (req.cookies.jwt == (undefined || null || "")) return res.redirect("/login");

  try {
    const citiesArray = await cities.getCities();

    const artistArray = await artists.findAll().then((artists) => {
      return artists;
    });
    const concert = await concerts.findById(req.params.uuid);
    if (!concert) {
      return res.status(404).send("Concert not found");
    }
    res.render("concerts_input", {
      title: `Edit ${concert.title}`,
      concert: concert,
      artists: artistArray || [],
      token: req.cookies.jwt,
      cities: citiesArray,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

/* POST concerts edit */
exports.concerts_edit_put = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  var updatedConcert = {
    id: req.params.uuid,
    title: req.body.title,
    city: req.body.city,
    date: req.body.date,
    price: req.body.price,
    artistid: req.body.artist,
  };

  const result = validationResult(req);
  if (!result.isEmpty()) {
    var artistArray = await artists.findAll().then((artists) => {
      return artists;
    });
    await concerts.findById(req.params.uuid).then((concert) => {
      res.render("concerts_input", {
        title: `Edit ${concert.title}`,
        newConcert: false,
        concert: concert,
        artists: artistArray || [],
        msg: result.array(),
        token: req.cookies.jwt,
      });
    });
  } else {
    await concerts.update(updatedConcert).then(() => {
      res.redirect("/concerts");
    });
  }
};
