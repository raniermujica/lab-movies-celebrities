const router = require("express").Router();
const express = require("express");
const Celebrity = require("../models/Celebrity.model.js");

//! Ruta para agregar una nueva celebridad
// GET "/celebrities/create"
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST "/celebrities/create"
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;


  
  try {
    await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });

    res.redirect("/");

  } catch (error) {
    next(error);
  }

});

router.get("/celebrities", async (req, res, next) => {
  
try {
  const celebritiesList = await Celebrity.find()
  res.render("celebrities/celebrities.hbs", {
  celebritiesList 
  })
}catch(error) {
  next(error)
} 
})







module.exports = router;
