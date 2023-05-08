const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  time: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  postId: { type: mongoose.Types.ObjectId, ref: "Post" },
  answersIds: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  answerUser: { type: String },
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

module.exports = mongoose.model("Comment", commentSchema);
