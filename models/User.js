const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaUser = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  likedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const User = mongoose.model("User", schemaUser);

module.exports = User;
