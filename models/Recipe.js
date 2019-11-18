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
  dishType: {
    type: String,
    enum: ["Drinks", "Dessert", "Mains", "Breakfast", "Snacks"],
    required: true
  },
  image: {
    type: String,
    default:
      "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/238353.jpg"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  preparationTime: {
    type: Number,
    required: true
  },
  method: {
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
