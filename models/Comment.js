const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: [],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
