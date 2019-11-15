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
    type: String,
    default: "http://something..."
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
  // contributions: number of recipies from this user
});

const User = mongoose.model("User", schemaUser);

module.exports = User;

// timestamps: {
//   createdAt: 'created_at',
//   updatedAt: 'updated_at'
// }
