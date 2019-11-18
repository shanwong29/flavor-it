const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/create", (req, res) => {
  res.render("recipe/recipe-form");
});

router.post("/update", (req, res) => {
  if (!req.body.title) {
    res.render("recipe/recipe-form", { message: "Recipe name can't be empty" });
    return;
  }
  // if (req.body.name === "") {
  //   res.render("recipe-form", { message: "Ingredient name can't be empty" });
  // }

  let ingredients = [];

  if (typeof req.body.name === "string") {
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

  let method = req.body.method.split("\n");

  Recipe.create({
    title: req.body.title,
    ingredients,
    dishType: req.body.dishType,
    preparationTime: req.body.preparationTime,
    method,
    portions: req.body.portions,
    source: req.body.source
  })
    .then(() => {
      res.send(req.body);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
