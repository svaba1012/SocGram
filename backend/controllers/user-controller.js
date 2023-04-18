const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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

  if (!user) {
    return next(new HttpError("Wrong password, email or username", 401));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed creating new user", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Wrong password, email or username", 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to login", 500));
  }

  user.password = null;
  res.json({ user, token });
};

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    next(new HttpError("Failed creating new user", 500));
  }

  let user = new User({ username, email, password: hashedPassword });
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
  let { username } = req.params;
  let userProfile;
  try {
    userProfile = await User.findOne({ username: username });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!userProfile) {
    return next(new HttpError("User don't exist"));
  }

  userProfile.password = null;

  res.json({ user: userProfile });
};

const changeProfilePicture = async (req, res, next) => {
  let userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }
  if (!user) {
    return next(new HttpError("Not found", 404));
  }

  user.profileImage = req.file.path;

  await user.save();

  res.json({ imageUrl: user.profileImage });
};

const removeProfilePicture = async (req, res, next) => {
  let userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }
  if (!user) {
    return next(new HttpError("Not found", 404));
  }

  try {
    let sess = await mongoose.startSession();
    sess.startTransaction();
    fs.unlink(user.profileImage, (err) => {
      console.log(err);
    });
    user.profileImage = null;
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  res.json({ msg: "Successfuly deleted" }).status(202);
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
    await followedUser.save({ session: sess });
    followerUser.follows.pull(followedId);
    await followerUser.save({ session: sess });
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
    follows = await User.find({
      _id: {
        $in: user.follows,
      },
    });
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
    followers = await User.find({ _id: { $in: user.followers } });
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
  changeProfilePicture,
  removeProfilePicture,
};
