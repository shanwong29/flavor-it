const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");

const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Comment = require("../models/Comment");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  };
};

// Recipe Create GET
router.get("/create", loginCheck(), (req, res) => {
  res.render("recipe/recipe-form", { loggedIn: req.user });
});

// Recipe Create POST
router.post(
  "/create",
  uploadCloud.single("imagePath"),
  loginCheck(),
  (req, res, next) => {
    const defaultRecipeImage =
      "http://res.cloudinary.com/jeffmoraes/image/upload/v1574087425/images/unknown-plate.png.png";
    let imagePath = req.file ? req.file.url : defaultRecipeImage;

    let ingredients = [];

    if (typeof req.body.name === "string") {
      let obj = {
        name: req.body.name.trim(),
        qty: req.body.qty,
        unit: req.body.unit
      };
      ingredients.push(obj);
    } else {
      req.body.name.forEach((element, index) => {
        let obj = {
          name: element.trim(),
          qty: req.body.qty[index],
          unit: req.body.unit[index]
        };
        ingredients.push(obj);
      });
    }

    let title = req.body.title.trim();
    let source = req.body.source.trim();
    let method = req.body.method.trim().split("\n");

    Recipe.create({
      title,
      ingredients,
      dishType: req.body.dishType,
      preparationTime: req.body.preparationTime,
      method,
      portions: req.body.portions,
      source,
      image: imagePath,
      creator: req.user._id
    })
      .then(doc => {
        res.redirect(`/recipe/${doc._id}`);
      })
      .catch(err => {
        next(err);
      });
  }
);

// Recipe Details
router.get("/:recipeId", (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .populate("creator")
    .populate({
      path: "comments",
      model: "Comment",
      populate: { path: "author", model: "User" }
    })
    .then(doc => {
      let isSameUser = false;
      let isSourceFilled = false;
      let isLiking = false;

      let reversedComments = JSON.parse(JSON.stringify(doc.comments.reverse()));

      reversedComments.forEach(el => {
        if (req.user._id.toString() === el.author._id.toString()) {
          el.isSameCommentAuthor = true;
        } else {
          el.isSameCommentAuthor = false;
        }
      });

      /****************************************  for comment line break trial
      // let reversedComments = JSON.parse(JSON.stringify(doc.comments.reverse()));
      // reversedComments.forEach(el => {
      //   el.content = el.content.split("\n");
      //   console.log("ell", el.content, typeof el.content);
      // });

      // console.log("Content", Arr);
      *************************************/
      if (doc.source) {
        isSourceFilled = true;
      }
      if (req.user) {
        const user = req.user._id;
        const creator = doc.creator._id;

        if (user.toString() == creator.toString()) {
          isSameUser = true;
        }
        User.findById(req.user._id).then(user => {
          user.likedRecipes.find(recipeId => {
            if (recipeId.toString() == doc._id.toString()) {
              isLiking = true;
            }
          });
          res.render("recipe/recipe-details", {
            recipe: doc,
            loggedIn: req.user,
            isSameUser,
            isSourceFilled,
            isLiking,
            reversedComments
          });
        });
      } else {
        res.render("recipe/recipe-details", {
          recipe: doc,
          loggedIn: req.user,
          isSameUser,
          isSourceFilled,
          isLiking
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

// Like Recipe
router.post("/like/:recipeId", (req, res, next) => {
  const recipeId = req.params.recipeId;
  const userLoggedId = req.user._id;
  User.findById(userLoggedId)
    .then(user => {
      let isLiking = false;
      user.likedRecipes.find(id => {
        if (id == recipeId) {
          isLiking = true;
        }
      });
      if (!isLiking) {
        User.findByIdAndUpdate(
          userLoggedId,
          {
            $push: { likedRecipes: recipeId }
          },
          {
            new: true
          }
        ).then(response => {
          Recipe.findByIdAndUpdate(
            recipeId,
            {
              $inc: { likes: 1 }
            },
            {
              new: true
            }
          ).then(recipe => {
            res.json({ isLiking, recipe });
            return;
          });
        });
      } else {
        User.findByIdAndUpdate(
          userLoggedId,
          {
            $pull: { likedRecipes: recipeId }
          },
          {
            new: true
          }
        ).then(response => {
          Recipe.findByIdAndUpdate(
            recipeId,
            {
              $inc: { likes: -1 }
            },
            {
              new: true
            }
          ).then(recipe => {
            res.json({ isLiking, recipe });

            return;
          });
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

//update recipe
router.get("/:recipeId/edit", loginCheck(), (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .populate("creator")
    .then(doc => {
      firstIngredient = doc.ingredients[0];
      remainingIngredient = "";
      if (doc.ingredients.length > 1) {
        remainingIngredient = doc.ingredients.slice(1);
      }
      res.render("recipe/recipe-update", {
        recipe: doc,
        loggedIn: req.user,
        firstIngredient,
        remainingIngredient
      });
    })
    .catch(err => {
      next(err);
    });
});

router.post(
  "/:recipeId/update",
  uploadCloud.single("imagePath"),
  async (req, res, next) => {
    const recipeId = req.params.recipeId;
    let ingredients = [];

    if (typeof req.body.name === "string") {
      let obj = {
        name: req.body.name.trim(),
        qty: req.body.qty,
        unit: req.body.unit
      };
      ingredients.push(obj);
    } else {
      req.body.name.forEach((element, index) => {
        let obj = {
          name: element.trim(),
          qty: req.body.qty[index],
          unit: req.body.unit[index]
        };
        ingredients.push(obj);
      });
    }

    let title = req.body.title.trim();
    let source = req.body.source.trim();
    let method = req.body.method.trim().split("\n");

    let recipe = await Recipe.findById(req.params.recipeId);

    let recipeImagePath = recipe.image;
    let imagePath = req.file ? req.file.url : recipeImagePath;

    Recipe.findByIdAndUpdate(req.params.recipeId, {
      title,
      ingredients,
      dishType: req.body.dishType,
      preparationTime: req.body.preparationTime,
      method,
      portions: req.body.portions,
      source,
      image: imagePath
    })
      .then(() => {
        res.redirect(`/recipe/${recipeId}`);
      })
      .catch(err => {
        next(err);
      });
  }
);

//delete recipe
router.get("/:recipeId/delete", (req, res, next) => {
  const query = { _id: req.params.recipeId };
  Recipe.deleteOne(query)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

//comment
router.post("/:recipeId/comment", loginCheck(), (req, res, next) => {
  const content = req.body.comment;
  const author = req.user._id;
  Comment.create({
    content,
    author
  })
    .then(comment => {
      return Recipe.findByIdAndUpdate(
        req.params.recipeId,
        {
          $push: {
            comments: comment._id
          }
        },
        {
          new: true
        }
      )
        .populate({
          path: "comments",
          model: "Comment",
          populate: {
            path: "author",
            model: "User"
          }
        })
        .then(doc => {
          let recipe = JSON.parse(JSON.stringify(doc));
          recipe.comments.reverse().forEach(el => {
            if (req.user._id.toString() === el.author._id.toString()) {
              el.isSameCommentAuthor = true;
            } else {
              el.isSameCommentAuthor = false;
            }
          });
          res.json(recipe);
        });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/comment/:commentId/delete", (req, res, next) => {
  recipeId = req.body.recipeId;
  commentId = req.body.commentId;

  Recipe.findByIdAndUpdate(
    recipeId,
    {
      $pull: { comments: commentId }
    },
    {
      new: true
    }
  )
    .populate({
      path: "comments",
      model: "Comment",
      populate: { path: "author", model: "User" }
    })
    .then(doc => {
      let recipe = JSON.parse(JSON.stringify(doc));
      recipe.comments.reverse().forEach(el => {
        if (req.user._id.toString() === el.author._id.toString()) {
          el.isSameCommentAuthor = true;
        } else {
          el.isSameCommentAuthor = false;
        }
      });
      res.json(recipe);

      return Comment.deleteOne({ _id: commentId })
        .then(doc => {
          console.log("deleled comment?", doc);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
