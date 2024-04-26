const { validationResult } = require("express-validator");
const artists = require("../api/artist");

/* GET artists listing. */
exports.artists_list = async function (req, res, next) {
  await artists.findAll().then((artists) => {
    res.render("artists", {
      title: "List of artists",
      artists: artists,
      token: req.cookies.jwt,
    });
  });
};

/* GET artists add */
exports.artists_create_get = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  await artists.findAll().then((artists) => {
    res.render("artists_input", {
      title: "Add a new artist",
      artists: artists,
      token: req.cookies.jwt,
    });
  });
};

/* POST artists add */
exports.artists_create_post = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  var newArtist = {
    artistname: req.body.artistname,
  };

  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    res.render("artists_input", {
      title: "Add a new artist",
      newArtist: true,
      artist: newArtist,
      msg: result.array,
      token: req.cookies.jwt
    });
  } else {
    await artists.create(newArtist).then(() => {
      res.redirect("/artists");
    });
  }
};

/* GET a artist */
exports.artists_detail = async function (req, res, next) {
  await artists.findById(req.params.uuid).then((artist) => {
    res.render("artist", {
      artist: artist,
      token: req.cookies.jwt,
    });
  });
};

/* DELETE artists */
exports.artists_delete = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  await artists.deleteById(req.params.uuid).then(() => {
    res.redirect("/artists");
  });
};

/* GET artists edit */
exports.artists_edit_get = async function (req, res, next) {
  if (req.cookies.jwt == (undefined || null || ""))
    return res.redirect("/login");

  await artists.findById(req.params.uuid).then((artist) => {
    res.render("artists_input", {
      title: `Edit ${artist.artistname}`,
      newArtist: false,
      artist: artist,
      token: req.cookies.jwt,
    });
  });
};

/* POST artists edit */
exports.artists_edit_put = async function (req, res, next) {
  if (req.cookies.jwt === (undefined || null || ""))
    return res.redirect("/login");

  var updatedArtist = {
    id: req.params.uuid,
    artistname: req.body.artistname,
  };

  const result = validationResult(req);
  if (!result.isEmpty()) {
    await artists.findById(req.params.uuid).then((artist) => {
      res.render("artists_input", {
        title: `Edit ${artist.artistname}`,
        newArtist: false,
        artist: artist,
        msg: result.array(),
      });
    });
  } else {
    await artists.update(updatedArtist).then(() => {
      res.redirect("/artists");
    });
  }
};
