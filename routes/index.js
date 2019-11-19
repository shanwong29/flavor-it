const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  Recipe.find({})
    .then(recipes => {
      res.render("index", { recipes, loggedIn: req.user });
    })
    .catch(err => console.log(err));
});

// search
router.get("/search", (req, res, next) => {
  const searchInput = req.query.searchInput;
  const option = req.query.options;
  const dishType = req.query.dishType;

  if (option === "recipe" && dishType) {
    Recipe.find({
      $and: [{ title: new RegExp(searchInput, "gi") }, { dishType: dishType }]
    })
      .then(recipes => {
        res.render("search", { recipes, loggedIn: req.user });
      })
      .catch(err => console.log(err));
  } else if (option === "recipe") {
    Recipe.find({ title: new RegExp(searchInput, "gi") })
      .then(recipes => {
        res.render("search", { recipes, loggedIn: req.user });
      })
      .catch(err => console.log(err));
  } else {
    User.find({ username: new RegExp(searchInput, "gi") })
      .then(users => {
        res.render("search", { users, loggedIn: req.user });
      })
      .catch(err => console.log(err));
  }
});
module.exports = router;
