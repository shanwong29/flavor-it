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
      res.redirect("/auth/login");
    }
  };
};

// User Profile
router.get("/:username", (req, res, next) => {
  let user = req.params.username;
  let diferentUser = true;
  let isFollowing = false;

  User.findOne({ username: user })
    .populate("likedRecipes", "title image")
    .populate("following", "username photo")
    .then((userProfile) => {
      if (req.user) {
        if (req.user.username === userProfile.username) {
          diferentUser = false;
        }
        let userProfileId = userProfile._id;
        User.findById(req.user._id).then((user) => {
          user.following.find((id) => {
            if (id.toString() == userProfileId.toString()) {
              isFollowing = true;
            }
          });
        });
      }
      return userProfile;
    })
    .then((userProfile) => {
      let limitedCardNum = 4;

      let likedRecipes = userProfile.likedRecipes.reverse();
      if (likedRecipes.length > limitedCardNum) {
        likedRecipes = likedRecipes.slice(0, limitedCardNum);
      }

      let following = userProfile.following.reverse();
      if (following.length > limitedCardNum) {
        following = following.slice(0, limitedCardNum);
      }
      Recipe.find({ creator: userProfile._id }).then((userRecipes) => {
        let limitedUserRecipes = userRecipes.reverse();
        if (limitedUserRecipes.length > limitedCardNum) {
          limitedUserRecipes = limitedUserRecipes.slice(0, limitedCardNum);
        }
        res.render("user/profile", {
          userProfile,
          userRecipes,
          diferentUser,
          isFollowing,
          loggedIn: req.user,
          limitedUserRecipes,
          likedRecipes,
          following,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});

// User following
router.get("/following/:userName", loginCheck(), (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .populate("following", "username photo")
    .then((user) => {
      res.render("user/following", {
        userProfile: user,
        loggedIn: req.user,
        following: user.following.reverse(),
      });
    })
    .catch((err) => console.log(err));
});

// User Recipes
router.get("/recipes/:userName", loginCheck(), (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .then((user) => {
      Recipe.find({ creator: user._id }).then((recipes) => {
        res.render("user/recipes", {
          recipes: recipes.reverse(),
          userProfile: user,
          loggedIn: req.user,
        });
      });
    })
    .catch((err) => console.log(err));
});

// User Likes
router.get("/likes/:userName", loginCheck(), (req, res, next) => {
  const userName = req.params.userName;
  User.findOne({ username: userName })
    .populate("likedRecipes", "title image")
    .then((user) => {
      res.render("user/likes", {
        recipes: user.likedRecipes.reverse(),
        userProfile: user,
        loggedIn: req.user,
      });
    })
    .catch((err) => console.log(err));
});

// User follow POST
router.post("/follow/:userId", loginCheck(), (req, res, next) => {
  const userId = req.params.userId;
  const userLogged = req.user._id;
  if (userId == userLogged) {
    res.json({ message: "You can not follow yourself" });
    return;
  }
  User.findById(userLogged)
    .then((user) => {
      let isNotFollowing = true;
      user.following.find((id) => {
        if (id == userId) {
          isNotFollowing = false;
        }
      });
      if (isNotFollowing) {
        User.findByIdAndUpdate(
          userLogged,
          {
            $push: { following: userId },
          },
          {
            new: true,
          }
        ).then((user) => {
          res.json(isNotFollowing);
          return;
        });
      } else {
        User.findByIdAndUpdate(
          userLogged,
          {
            $pull: { following: userId },
          },
          {
            new: true,
          }
        ).then((user) => {
          res.json(isNotFollowing);
          return;
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// User Edit photo
router.post(
  "/:userId/edit",
  loginCheck(),
  uploadCloud.single("imagePath"),
  (req, res, next) => {
    if (req.params.userId !== req.user.id) {
      return res.json({ message: "You can only edit your own profile photo" });
    }
    const defaultUserImage =
      "http://res.cloudinary.com/jeffmoraes/image/upload/v1574087867/images/unknown-user.jpg.jpg";
    let imagePath = req.file ? req.file.url : defaultUserImage;
    User.findByIdAndUpdate(req.params.userId, { photo: imagePath })
      .then((user) => {
        res.redirect(`/${user.username}`);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// User delete account
// router.get("/:userId/delete", loginCheck(), (req, res, next) => {
//   Recipe.deleteMany({ creator: req.params.userId })
//     .then(recipes => {
//       User.findByIdAndDelete(req.params.userId).then(user => {
//         res.redirect("/");
//       });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
