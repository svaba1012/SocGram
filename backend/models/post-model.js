const mongoose = require("mongoose");

const commentSchema = require("./comment-model");

const markedUsersSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },

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
});

module.exports = mongoose.model("Post", postSchema);
