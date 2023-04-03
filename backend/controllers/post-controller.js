const HttpError = require("../models/httpError");
const Post = require("../models/post-model");
const User = require("../models/user-model");

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!post) {
    return next(new HttpError("Post not found", 404));
  }

  res.json(post);
};

const insertPost = async (req, res, next) => {
  const { creator } = req.body;
  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!user) {
    return next(new HttpError("Wrong user", 422));
  }

  let post = new Post({ time: new Date().getTime(), creator });

  //   FINISH...
};

module.exports = { getPostById, insertPost };
