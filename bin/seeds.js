const recipes = [
  {
    title: "Savoury White Fish With Simmered Tomatoes",
    ingredients: [
      "2 tablespoons olive oil",
      "3 cloves garlic, thinly sliced",
      "2 teaspoons McCormick® Savory Spice Blend",
      "14 ½ oz canned whole tomatoes (410 g), 1 can",
      "¼ cup dry white wine (60 mL)",
      "3 bay leaves",
      "kosher salt, to taste",
      "freshly ground black pepper, to taste",
      "24 oz white fish fillet (680 g), such as cod, halibut, or sea bass, skin removed",
      "¼ cup fresh basil (10 g), thinly sliced"
    ],
    dishType: "Mains",
    preparationTime: 45,
    method: [
      "Heat the olive oil in a large skillet over medium-low heat. Add the garlic and 1 teaspoon of Savory spice blend and cook until fragrant, stirring often and ensuring the garlic does not brown, about 3 minutes.",
      "Increase the heat to medium. Add the tomatoes and their juices, crushing well with your hands, then add the wine and bay leaves. Bring to a boil, then reduce the heat to medium-low and simmer for 5 minutes. Season with salt and pepper.",
      "Season the fish with the remaining teaspoon of Savory spice blend, salt, and pepper and place in the skillet. Cover and cook at a bare simmer until the fish is opaque throughout and beginning to flake, 5–7 minutes (thicker pieces will take longer to cook).",
      "Gently transfer the fish to shallow bowls and spoon the poaching liquid over. Top with basil."
    ],
    portions: 3,
    likes: 5
  },
  {
    title: "Mac & Cheese",
    ingredients: [
      "5 cups milk (1 ¼ L)",
      "1 lb elbow macaroni (455 g), dry",
      "2 cups shredded cheddar cheese (200 g)"
    ],
    dishType: "Mains",
    preparationTime: 30,
    method: [
      "In a large pot, bring the milk to a boil.",
      "Add the pasta and stir constantly until the pasta is cooked, about 10 minutes.",
      "Turn off the heat, then add the cheddar. Stir until the cheese is melted and the pasta is evenly coated."
    ],
    portions: 4,
    likes: 15
  },
  {
    title: "The Best Fudgy Brownies",
    ingredients: [
      "8 oz good-quality chocolate (225 g), semi-sweet",
      "12 tablespoons butter, melted",
      "1 ¼ cups sugar (250 g)",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "¾ cup all-purpose flour (95 g)",
      "¼ cup cocoa powder (30 g)",
      "1 teaspoon salt"
    ],
    dishType: "Dessert",
    preparationTime: 60,
    method: [
      "Preheat the oven to 350°F (180°C). Line an 8-inch (20 cm) square baking dish with parchment paper.",
      "Chop the chocolate into chunks. Melt half of the chocolate in the microwave in 20-second intervals, saving the other half for later.",
      "In a large bowl, mix the butter and sugar with an electric hand mixer, then beat in the eggs and vanilla for 1-2 minutes, until the mixture becomes fluffy and light in color.",
      "Whisk in the melted chocolate (make sure it's not too hot or else the eggs will cook), then sift in the flour, cocoa powder, and salt. Fold to incorporate the dry ingredients, being careful not to overmix as this will cause the brownies to be more cake-like in texture.",
      "Fold in the chocolate chunks, then transfer the batter to the prepared baking dish.",
      "Bake for 20-25 minutes, depending on how fudgy you like your brownies, then cool completely.",
      "Slice, then serve with a nice cold glass of milk!"
    ],
    portions: 9,
    likes: 43
  },
  {
    title: "Ratatouille Salad",
    ingredients: [
      "olive oil, for cooking",
      "1 large eggplant, or 2 small, cubed",
      "salt, to taste",
      "pepper, to taste",
      "1 red bell pepper, seeded and chopped",
      "yellow bell pepper, seeded and chopped",
      "1 small white onion, chopped",
      "2 cloves garlic, minced",
      "1 yellow squash, sliced",
      "1 zucchini, sliced",
      "1 tablespoon fresh thyme, chopped",
      "3 roma tomatoes, diced",
      "½ lemon, juiced",
      "1 cup white quinoa (170 g), uncooked",
      "2 ½ cups water (600 mL)",
      "1 tablespoon fresh basil, chopped"
    ],
    dishType: "Mains",
    preparationTime: 40,
    method: [
      "Heat a bit of olive oil in a large skillet over medium heat. Add the eggplant, season with salt and pepper, and cook, stirring occasionally, until golden brown and softened, 5-10 minutes. Remove from the pan and drain on paper towels.",
      "Heat more oil in the pan, then add the bell peppers. Cook, stirring occasionally, until softened, 2-3 minutes.",
      "Add the onion and garlic and cook, stirring, until the onions are soft and golden, about 3 minutes.",
      "Remove the peppers and onions from the pan.",
      "Add the yellow squash and zucchini, season with salt and pepper, and cook squash have cooked down a bit, about 5 minutes.",
      "Add the thyme and tomatoes, season with more salt, then add the lemon juice. Increase the heat to high and cook until mixture is sizzling. Cook, stirring occasionally, until the tomatoes start to release their juices, about 2 minutes.",
      "Return the eggplant and pepper mixture to the pan, stir to combine, then remove the pan from the heat.",
      "Spoon the vegetables over quinoa and sprinkle the basil on top. Serve warm."
    ],
    portions: 2,
    likes: 10
  },
  {
    title: "Classic Pad Thai",
    ingredients: [
      "½ lb wide rice noodle (225 g)",
      "¼ cup palm sugar (50 g)",
      "¼ cup fish sauce (60 mL)",
      "¼ cup tamarind paste (55 g)",
      "1 tablespoon oil",
      "6 oz boneless, skinless chicken breast (170 g)",
      "2 cloves garlic, minced",
      "2 shallots, minced",
      "1 teaspoon pickled turnip, optional",
      "1 egg",
      "4 oz tofu (110 g), cubed, optional",
      "½ bunch green onion, or chinese chives, sliced, plus more for serving",
      "½ cup bean sprout (50 g), plus more for serving",
      "lime, for serving",
      "peanut, for serving",
      "red thai chile, diced, for serving, optional"
    ],
    dishType: "Mains",
    preparationTime: 60,
    method: [
      "Soak rice noodles in room temperature water 30 minutes prior to cooking.",
      "In a small saucepan over medium-high heat, whisk together palm sugar, tamarind paste, and fish sauce. Bring to a boil, reduce heat, and reduce for 5 minutes until the sauce thickens and coats the back of a wooden spoon. Remove sauce from heat and set aside.",
      "Heat a cast-iron pan or wok over high heat.",
      "Add oil and chicken and cook for about two minutes until nearly cooked through and nicely seared on all sides.",
      "Add minced garlic, shallots, and turnips to the chicken and stir to incorporate.",
      "Move the chicken to the side of the pan and add the egg. Break the egg up with a spatula or wooden spoon and stir to scramble.",
      "Add soaked rice noodles and stir to evenly incorporate all ingredients, stirring for 1 to 2 minutes.",
      "Add 2 or 3 tablespoons of the reduced sauce and stir.",
      "Add tofu, Chinese chives or green onions, and bean sprouts. Stir to incorporate and remove from heat.",
      "Serve immediately with lime, peanuts, more sprouts and chives, and red chiles, if desired."
    ],
    portions: 4,
    likes: 32
  }
];

const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

mongoose.connect("mongodb://localhost/flavor-it");

Recipe.insertMany(recipes)
  .then(documents => {
    console.log(`Success" ${documents.length} recipes were added`);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// const bcryptSalt = 10;

// mongoose
//   .connect('mongodb://localhost/project2', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })
