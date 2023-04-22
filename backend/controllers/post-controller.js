const mongoose = require("mongoose");

const HttpError = require("../models/httpError");
const Post = require("../models/post-model");
const User = require("../models/user-model");
const Comment = require("../models/comment-model");

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!post) {
    return next(new HttpError("Post not found", 404));
  }

  res.json({ post });
};

const insertPost = async (req, res, next) => {
  const { creator, description } = req.body;
  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!user) {
    return next(new HttpError("Wrong user", 422));
  }

  let imagesPaths = req.files.map((file) => file.path);

  if (description.length === 0) {
    description = null;
  }

  let post = new Post({
    time: new Date().getTime(),
    creator,
    description,
    markedUsers: [],
    multimedias: imagesPaths,
    likes: [],
  });

  await post.save();

  res.json({ post });
};

const likePost = async (req, res, next) => {
  let postId = req.params.pid;
  let { userId } = req.body;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!post) {
    return next(new HttpError("Can't find that post", 404));
  }
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!user) {
    return next(new HttpError("No user", 422));
  }

  try {
    post.likes.push(userId);
    await post.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  res.json({ post });
};

const deletePost = async (req, res, next) => {
  let postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database"));
  }

  if (!post) {
    return next(new HttpError("No such post", 404));
  }

  try {
    let sess = await mongoose.startSession();
    sess.startTransaction();
    if (post.comments.length > 0) {
      await Comment.deleteMany({ postId: postId });
    }
    await Post.deleteOne({ _id: postId });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to delete post...", 500));
  }

  res.json({ delete: "Delete ok" });
};

const getPosts = async (req, res, next) => {
  let query = req.query;
  let posts;

  try {
    posts = await Post.find(query);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!posts) {
    posts = [];
  }

  res.json({ posts: posts });
};

module.exports = { getPostById, getPosts, insertPost, likePost, deletePost };
