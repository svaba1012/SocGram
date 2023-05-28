const mongoose = require("mongoose");

const HttpError = require("../models/httpError");
const Post = require("../models/post-model");
const User = require("../models/user-model");
const Comment = require("../models/comment-model");

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $addFields: { numOfComments: { $size: "$comments" } } },
      { $addFields: { numOfLikes: { $size: "$likes" } } },
      { $unset: ["comments"] },
    ]);
    await Post.populate(post, { path: "creator" });
    await Post.populate(post, { path: "likes", limit: 3 });
    await Post.populate(post, {
      path: "markedUsers.userId",
      select: "username _id",
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!post) {
    return next(new HttpError("Post not found", 404));
  }

  res.json({
    post: post[0],
  });
};

const insertPost = async (req, res, next) => {
  const { creator, description, tagged } = req.body;
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
    markedUsers: JSON.parse(tagged),
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

  res.json({ like: userId });
};

const removePostLike = async (req, res, next) => {
  let { uid, pid } = req.params;

  let post;
  try {
    post = await Post.findById(pid);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!post) {
    return next(new HttpError("Can't find that post", 404));
  }
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!user) {
    return next(new HttpError("No user", 422));
  }

  try {
    post.likes.pull(uid);

    await post.save();
  } catch (error) {
    return next(new HttpError("DB error", 500));
  }

  res.json({ like: uid }).status(202);
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

const getProfilePosts = async (req, res, next, creator) => {
  let posts;
  try {
    posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $addFields: { numOfComments: { $size: "$comments" } } },
      { $unset: ["comments"] },
      {
        $match: {
          creator: new mongoose.Types.ObjectId(creator),
        },
      },
    ]);
  } catch (err) {
    console.log(err);
    return next(new HttpError("DB error", 500));
  }

  if (!posts) {
    posts = [];
  }

  res.json({ posts: posts });
};

const getPostsOfUserFollowers = async (req, res, next, userId) => {
  let page = req.query.page;
  const POST_LIMIT = 5;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!user) {
    return next(new HttpError("Not found", 404));
  }

  let posts;
  try {
    posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $addFields: { numOfComments: { $size: "$comments" } } },
      { $addFields: { numOfLikes: { $size: "$likes" } } },
      { $unset: ["comments"] },
      { $match: { creator: { $in: user.follows } } },

      { $sort: { time: -1 } },
      { $limit: POST_LIMIT },
      // { $skip: page * POST_LIMIT },
    ]);

    await Post.populate(posts, { path: "creator" });
    await Post.populate(posts, { path: "likes", perDocumentLimit: 3 });
    await Post.populate(posts, {
      path: "markedUsers.userId",
      select: "username _id",
    });
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!posts) {
    posts = [];
  }

  res.json({ posts });
};

const getPostsWhereMarked = async (req, res, next, muid) => {
  let posts;
  try {
    posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $addFields: { numOfComments: { $size: "$comments" } } },
      { $unset: ["comments"] },
      {
        $match: {
          markedUsers: {
            $elemMatch: { userId: new mongoose.Types.ObjectId(muid) },
          },
        },
      },
    ]);
  } catch (err) {
    console.log(err);
    return next(new HttpError("DB error", 500));
  }

  if (!posts) {
    posts = [];
  }

  res.json({ posts: posts });
};

const getPosts = async (req, res, next) => {
  let query = req.query;
  let creator = query.creator;
  let uid = query.uid;
  let muid = query.muid;

  if (creator) {
    await getProfilePosts(req, res, next, creator);
  } else if (uid) {
    await getPostsOfUserFollowers(req, res, next, uid);
  } else if (muid) {
    await getPostsWhereMarked(req, res, next, muid);
  }
};

module.exports = {
  getPostById,
  getPosts,
  insertPost,
  likePost,
  deletePost,
  removePostLike,
};
