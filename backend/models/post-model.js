const mongoose = require("mongoose");

const commentSchema = require("./comment-model");

const postSchema = new mongoose.Schema({
  description: { type: String },
  time: { type: Number, required: true },
  location: { type: String },
  multimedias: [{ path: String }],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  markedUsers: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  // comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
