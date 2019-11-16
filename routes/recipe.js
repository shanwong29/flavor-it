const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/create", (req, res) => {
  res.render("recipe/recipe-form");
});

module.exports = router;
