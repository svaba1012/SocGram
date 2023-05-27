const mongoose = require("mongoose");

const commentSchema = require("./comment-model");

const markedUsersSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  // xPos: { type: Number, required: true },
  // yPos: { type: Number, required: true },
  imageId: { type: Number, required: true },
});

const postSchema = new mongoose.Schema({
  description: { type: String },
  time: { type: Number, required: true },
  location: { type: String },
  multimedias: [String],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  markedUsers: [markedUsersSchema],
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  //comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
