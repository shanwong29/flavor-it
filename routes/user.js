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
  let user = req.params.username;
  let diferentUser = true;
  let isFollowing = false;

  User.findOne({ username: user })
    .populate("likedRecipes")
    .populate("following")
    .then(userProfile => {
      if (req.user) {
        if (req.user.username === userProfile.username) {
          diferentUser = false;
        }
        let userProfileId = userProfile._id;
        User.findById(req.user._id).then(user => {
          user.following.find(id => {
            if (id.toString() == userProfileId.toString()) {
              isFollowing = true;
            }
          });
        });
      }
      return userProfile;
    })
    .then(userProfile => {
      Recipe.find({ creator: userProfile._id }).then(userRecipes => {
        res.render("user/profile", {
          userProfile,
          userRecipes,
          diferentUser,
          isFollowing,
          loggedIn: req.user
        });
      });
    });
});

router.post("/follow/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const userLogged = req.user._id;
  if (userId == userLogged) {
    res.json({ message: "You can not follow yourself" });
    return;
  }
  User.findById(userLogged)
    .then(user => {
      let isNotFollowing = true;
      user.following.find(id => {
        if (id == userId) {
          isNotFollowing = false;
        }
      });
      if (isNotFollowing) {
        User.findByIdAndUpdate(
          userLogged,
          {
            $push: { following: userId }
          },
          {
            new: true
          }
        ).then(user => {
          res.json(isNotFollowing);
          return;
        });
      } else {
        User.findByIdAndUpdate(
          userLogged,
          {
            $pull: { following: userId }
          },
          {
            new: true
          }
        ).then(user => {
          res.json(isNotFollowing);
          return;
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
