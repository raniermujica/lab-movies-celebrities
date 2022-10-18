const router = require("express").Router();
const express = require('express');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//Rutas de Movies
const moviesRoutes = require("./movies.routes.js")
router.use("/movies", moviesRoutes)

//Rutas Celebrities
const celebritiesRoutes = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRoutes)

module.exports = router;