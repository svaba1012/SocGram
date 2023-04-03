const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  time: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  postId: { type: mongoose.Types.ObjectId, ref: "Post" },
  answers: [this],
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

module.exports = mongoose.model("Comment", commentSchema);
