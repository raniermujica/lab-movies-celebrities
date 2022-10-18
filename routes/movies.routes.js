// const router = require("express").Router();
// const express = require('express');
const router = require("express").Router();
const { routes } = require("../app");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");

//ruta crear movie

router.get("/create", async (req, res, next) => {
  try {
    const celebritiesList = await Celebrity.find();
    res.render("movies/new-movie.hbs", {
      celebritiesList,
    });
  } catch (error) {
    next(error);
  }
});

//ruta añadir movie

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

//ruta para list

router.get("/", async (req, res, next) => {
  try {
    const moviesList = await Movie.find();
    res.render("movies/movies.hbs", {
      moviesList,
    });
  } catch (err) {
    next(err);
  }
});

//ruta para ver details movie

router.get("/:movieId/details", async (req, res, next) => {
  let { movieId } = req.params;

  try {
    const movieDetails = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details.hbs", {
      movieDetails,
    });
  } catch (error) {
    next(error);
  }
});

//ruta para delete movie

router.post("/:id/delete", async (req, res, next) => {
  let { id } = req.params;

  try {
    await Movie.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});
//10
//Ruta para editar películas
router.get("/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params

  Movie.findById(movieId)
    .populate("cast")
    .then((response) => {
      console.log(response);
      //  console.log(".cast", response.cast)
      res.render("movies/edit-movie.hbs", {
        details: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//recibir la data
router.post("/:movieId/edit", (req, res, next) => {
  const { movieId } = req.params;

  const { title, genre, plot, cast } = req.body;
  console.log(req.body);

  const movieUpdate = {
    title,
    genre,
    plot,
    cast
  };

  Movie.findByIdAndUpdate(movieId, movieUpdate)
    .then((response) => {
        console.log(response)
      res.redirect(`/movies/${movieId}/details`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
