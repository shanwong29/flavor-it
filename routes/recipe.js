const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");

const Recipe = require("../models/Recipe");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  };
};

router.get("/create", loginCheck(), (req, res) => {
  res.render("recipe/recipe-form", { loggedIn: req.user });
});

router.post(
  "/create",
  uploadCloud.single("imagePath"),
  loginCheck(),
  (req, res) => {
    let warning = "";

    // check if the required inputs are empty

    if (!req.body.dishType) {
      warning = "Please select Dish Type";
    }

    if (!req.body.method) {
      warning = "Please provide the cooking methods";
    }

    if (req.body.name === "") {
      warning = "Ingredient name can't be empty";
    }
    if (typeof req.body.name === "object") {
      req.body.name.forEach(element => {
        if (element === "") {
          warning = "Ingredient name can't be empty";
        }
      });
    }
    if (!req.body.portions) {
      warning = "Please enter portion(s)";
    }

    if (!req.body.preparationTime) {
      warning = "Please enter preparation time";
    }

    if (!req.body.title) {
      warning = "Recipe title can't be empty";
    }

    if (warning) {
      res.render("recipe/recipe-form", {
        warning,
        filledIn: req.body,
        loggedIn: req.user
      });

      return;
    }

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
        console.log(err);
      });
  }
);

router.get("/:recipeId", (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .populate("creator")
    .then(doc => {
      let isSameUser = false;
      if (req.user) {
        const user = req.user.username;
        const creator = doc.creator.username;
        if (user === creator) {
          isSameUser = true;
        }
      }
      res.render("recipe/recipe-details", {
        recipe: doc,
        loggedIn: req.user,
        isSameUser
      });
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
      res.render("recipe/recipe-update", { recipe: doc, loggedIn: req.user });
    })
    .catch(err => {
      next(err);
    });
});

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
module.exports = router;

// router.post(
//   "/create",
//   uploadCloud.single("imagePath"),
//   loginCheck(),
//   (req, res) => {
//     if (!req.body.title) {
//       res.render("recipe/recipe-form", {
//         message: "Recipe name can't be empty"
//       });
//       return;
//     }
//     if (req.body.dishType === "") {
//       res.render("recipe/recipe-form", {
//         message: "Please select Dish Type"
//       });
//       return;
//     }

//     if (req.body.preparationTime === "") {
//       res.render("recipe/recipe-form", {
//         message: "Please enter preparation time"
//       });
//       return;
//     }
//     if (req.body.portions === "") {
//       res.render("recipe/recipe-form", {
//         message: "Please enter portion(s)"
//       });
//       return;
//     }

//     //check ingredient field
//     if (req.body.name === "") {
//       res.render("recipe/recipe-form", {
//         message: "Ingredient name can't be empty"
//       });
//       return;
//     }
//     if (typeof req.body.name === "object") {
//       req.body.name.forEach(element => {
//         if (element === "") {
//           res.render("recipe/recipe-form", {
//             message: "Ingredient name can't be empty"
//           });
//         }
//       });
//       return;
//     }

//     if (req.body.method === "") {
//       res.render("recipe/recipe-form", {
//         message: "Please provide the cooking methods"
//       });
//       return;
//     }
