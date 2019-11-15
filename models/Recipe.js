const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaRecipe = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [],
    required: true
  },
  dishTypes: {
    type: String,
    enum: ["Drinks", "Dessert", "Mains", "Breakfast", "Snacks"],
    required: true
  },
  image: {
    type: String,
    default: "http://something..."
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  preparationTime: {
    type: Number,
    required: true
  },
  preparation: {
    type: [],
    required: true
  },
  portions: {
    type: Number
  },
  likes: {
    type: Number,
    default: 0
  },
  source: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

const Recipe = mongoose.model("Recipe", schemaRecipe);

module.exports = Recipe;
