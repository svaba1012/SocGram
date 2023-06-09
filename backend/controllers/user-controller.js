const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/user-model");
const Post = require("../models/post-model");
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
  let { uid } = req.query;
  let userProfile;
  if (uid) {
    try {
      userProfile = await User.findById(uid)
        .select({ username: 1, firstName: 1, lastName: 1, profileImage: 1 })
        .exec();
    } catch (error) {
      console.log(error);
      return next(new HttpError("Can't connect to the database", 500));
    }

    if (!userProfile) {
      return next(new HttpError("User don't exist"));
    }
    res.json({ user: userProfile });
    return;
  }

  try {
    userProfile = await User.findOne({ username: username });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Can't connect to the database", 500));
  }

  if (!userProfile) {
    return next(new HttpError("User don't exist"));
  }

  let postCount = 0;
  try {
    postCount = await Post.aggregate([
      {
        $match: {
          creator: userProfile._id,
        },
      },
      {
        $count: "count",
      },
    ]);
  } catch (err) {
    return next(new HttpError("DB error"), 500);
  }

  let count =
    postCount && postCount[0] && postCount[0].count ? postCount[0].count : 0;
  userProfile.password = null;

  res.json({ user: userProfile, postCount: count });
};

const getSuggestionsForUser = async (req, res, next) => {
  let userId = req.query.suggestFor;
  let user;
  try {
    user = await User.findById(userId).populate("follows");
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }
  if (!user) {
    return next(new HttpError("DB error", 404));
  }
  let occurances = {};
  let alreadyFollowing = {};
  user.follows.forEach((follow) => {
    alreadyFollowing[follow._id] = true;
  });
  alreadyFollowing[userId] = true;
  user.follows.forEach((follow) => {
    follow.follows.forEach((uid) => {
      if (occurances[uid]) {
        occurances[uid].num++;
      } else if (uid != userId && !alreadyFollowing[uid]) {
        occurances[uid] = {};
        occurances[uid].num = 1;
        occurances[uid].oneFollower = follow;
      }
    });
  });

  let ids = Object.keys(occurances);
  let values = Object.values(occurances);
  let suggestionsIds = ids.map((id, index) => {
    return { id: id, ...values[index] };
  });
  suggestionsIds = suggestionsIds.sort((obj1, obj2) => obj2.num - obj1.num);
  suggestionsIds = suggestionsIds.filter((suggestion, i) => i < 5);
  let suggestions;
  try {
    let ids = suggestionsIds.map((sug) => new mongoose.Types.ObjectId(sug.id));
    suggestions = await User.aggregate([
      {
        $match: {
          _id: {
            $in: ids,
          },
        },
      },
      { $addFields: { __order: { $indexOfArray: [ids, "$_id"] } } },
      { $sort: { __order: 1 } },
    ]);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }
  if (!suggestions) {
    suggestions = [];
  }
  // console.log(suggestions);
  // greska
  let suggestionsFull = suggestionsIds.map((sugId, i) => {
    return { ...sugId, user: suggestions[i] };
  });

  res.json({ suggestions: suggestionsFull });
};

const getUserProfilesByIds = async (req, res, next) => {
  let query = req.query;

  if (!query.users) {
    return next(new HttpError("Not found", 404));
  }
  let users;
  let ids = JSON.parse(query.users).users;

  try {
    users = await User.find({ _id: { $in: ids } });
  } catch (error) {
    return next("DB error", 500);
  }

  if (!users) {
    return next(new HttpError("Not found", 404));
  }

  res.json({ users });
};

const searchUsers = async (req, res, next) => {
  let searchText = req.query.search;
  let users;
  try {
    users = await User.find({});
    console.log("Implement user search");
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!users) {
    users = [];
  }

  res.json({ users });
};

const getUsers = async (req, res, next) => {
  if (req.query.users) {
    await getUserProfilesByIds(req, res, next);
  } else if (req.query.suggestFor) {
    await getSuggestionsForUser(req, res, next);
  } else if (req.query.search) {
    await searchUsers(req, res, next);
  }
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

  if (user.profileImage) {
    fs.unlink(user.profileImage, (err) => console.log(err));
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

  res.json({ userId });
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

  res.json({ userId }).status(202);
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
  getUsers,
  insertFollow,
  deleteFollow,
  getFollowsByUserId,
  getFollowersByUserId,
  changeProfilePicture,
  removeProfilePicture,
};
