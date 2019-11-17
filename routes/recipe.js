const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/create", (req, res) => {
  res.render("recipe/recipe-form");
});

router.post("/update", (req, res) => {
  let ingredients = [];

  if (typeof req.body.name == "string") {
    let obj = { name: req.body.name, qty: req.body.qty, unit: req.body.unit };
    ingredients.push(obj);
  } else {
    req.body.name.forEach((element, index) => {
      let obj = {
        name: element,
        qty: req.body.qty[index],
        unit: req.body.unit[index]
      };
      ingredients.push(obj);
    });
  }

  // res.send(ingredients);

  Recipe.create({
    name: req.body.title,
    ingredients,
    dishTypes: req.body.dishType,
    preparationTime: req.body.preparationTime,
    preparation: [req.body.method],
    portions: req.body.portions,
    source: req.body.source
  })
    .then(() => {
      res.send("Success");
    })
    .catch(err => {
      console.log(err);
    });

  // ;
});

module.exports = router;
