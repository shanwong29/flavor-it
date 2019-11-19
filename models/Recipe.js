const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaRecipe = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [],
    required: true
  },
  dishType: {
    type: String,
    required: true
  },
  image: {
    type: String
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
