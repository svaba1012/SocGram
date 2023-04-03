const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
  follows: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
