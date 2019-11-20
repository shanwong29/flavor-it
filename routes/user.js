const express = require("express");
const router = express.Router();
// Cloudinary
const uploadCloud = require("../config/cloudinary");

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

// User Profile
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

// User following
router.get("/following/:userName", (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .populate("following")
    .then(user => {
      res.render("user/following", { userProfile: user });
    })
    .catch(err => console.log(err));
});

// User Recipes
router.get("/recipes/:userName", (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .then(user => {
      Recipe.find({ creator: user._id }).then(recipes => {
        res.render("user/recipes", { recipes, userProfile: user });
      });
    })
    .catch(err => console.log(err));
});

// User Likes
router.get("/likes/:userName", (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .populate("likedRecipes")
    .then(user => {
      res.render("user/likes", {
        recipes: user.likedRecipes,
        userProfile: user
      });
    })
    .catch(err => console.log(err));
});

// User follow POST
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

// User Edit photo
router.post(
  "/:userId/edit",
  uploadCloud.single("imagePath"),
  loginCheck(),
  (req, res, next) => {
    const defaultUserImage =
      "http://res.cloudinary.com/jeffmoraes/image/upload/v1574087867/images/unknown-user.jpg.jpg";
    let imagePath = req.file ? req.file.url : defaultUserImage;
    User.findByIdAndUpdate(req.params.userId, { photo: imagePath })
      .then(user => {
        res.redirect(`/${user.username}`);
      })
      .catch(err => {
        next(err);
      });
  }
);

// User delete account
router.get("/:userId/delete", loginCheck(), (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .then(user => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
