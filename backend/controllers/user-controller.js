const mongoose = require("mongoose");
const _ = require("lodash");

const User = require("../models/user-model");
const HttpError = require("../models/httpError");

const signIn = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  let user;
  try {
    user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  } catch (err) {
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Wrong password, email or username", 401));
  }
  user.password = null;
  res.json({ user });
};

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  let user = new User({ username, email, password });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Can't connect to the database", 500));
  }
  user.password = null;
  //   user = _.omit(user, ["password"]);
  res.json({ user });
};

const getUserProfile = async (req, res, next) => {
  let { uid } = req.params;
  let userProfile;
  try {
    userProfile = await User.findById(uid);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!userProfile) {
    return next(new HttpError("User don't exist"));
  }

  res.json({ user: userProfile });
};

const insertFollow = async (req, res, next) => {
  const userId = req.params.uid;
  const { followedId } = req.body;
  let followedUser, followerUser;
  try {
    followedUser = await User.findById(followedId);
    followerUser = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Can't connect to the database", 500));
  }
  if (!followerUser || !followedUser) {
    return next(new HttpError("Wrong users", 422));
  }

  if (followerUser.follows.includes(followedId)) {
    return next(new HttpError("You are already following this user...", 422));
  }

  try {
    let sess = await mongoose.startSession();
    sess.startTransaction();
    followedUser.followers.push(userId);
    await followedUser.save({ session: sess });
    followerUser.follows.push(followedId);
    await followerUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Following failed...", 500));
  }

  res.json({ follower: followerUser, followed: followedUser });
};

const deleteFollow = async (req, res, next) => {
  let { uid, followedId } = req.params;
  let userId = uid;
  let followedUser, followerUser;

  try {
    followedUser = await User.findById(followedId);
    followerUser = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Can't connect to the database", 500));
  }
  if (!followerUser || !followedUser) {
    return next(new HttpError("Wrong users", 422));
  }

  if (!followerUser.follows.includes(followedId)) {
    return next(new HttpError("You are not following this user...", 422));
  }

  try {
    let sess = await mongoose.startSession();
    sess.startTransaction();
    followedUser.followers.pull(userId);
    await followedUser.save();
    followerUser.follows.pull(followedId);
    await followerUser.save();
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Unfollow failed...", 500));
  }

  res.json({ follower: followerUser, followed: followedUser });
};

const getFollowsByUserId = async (req, res, next) => {
  let userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Connection with database is lost...", 500));
  }

  if (!user) {
    return next(new HttpError("Can't find user", 404));
  }
  let follows;
  try {
    await User.find({ _id: { $in: user.following } });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  res.json({ follows });
};

const getFollowersByUserId = async (req, res, next) => {
  let userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Connection with database is lost...", 500));
  }

  if (!user) {
    return next(new HttpError("Can't find user", 404));
  }
  let followers;
  try {
    await User.find({ _id: { $in: user.followers } });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Can't connect to the database", 500));
  }

  res.json({ followers });
};

module.exports = {
  signIn,
  signUp,
  getUserProfile,
  insertFollow,
  deleteFollow,
  getFollowsByUserId,
  getFollowersByUserId,
};
