const express = require("express");
const router = express.Router();
// const uploadCloud = require("../config/cloudinary");

const Recipe = require("../models/Recipe");
const User = require("../models/User");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  };
};

router.get("/:username", (req, res) => {
  console.log("ok");
  let user = req.params.username;
  User.findOne({ username: user })
    .populate("likedRecipes")
    .populate("following")
    .populate("followers")
    .then(userProfile => {
      Recipe.find({ creator: userProfile._id }).then(userRecipes => {
        console.log(userRecipes);
        res.render("user/profile", {
          userProfile,
          userRecipes,
          loggedIn: req.user
        });
      });
    });
});

module.exports = router;
