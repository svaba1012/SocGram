const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment-model");

const insertComment = async (req, res, next) => {
  let { creator, text, commentId, answerUser } = req.body;
  let postId = req.pid;
  let comment;

  if (!commentId) {
    // classical comment
    comment = new Comment({
      text: text,
      time: new Date().getTime(),
      creator: creator,
      postId: postId,
      answersIds: [],
      answerUser,
      likes: [],
    });
    try {
      await comment.save();
    } catch (err) {
      return next(new HttpError("DB error, 500"));
    }

    res.json({ comment });
    return;
  }
  comment = new Comment({
    text: text,
    time: new Date().getTime(),
    creator: creator,
    answersIds: [],
    answerUser,
    likes: [],
  });
  // answering comment
  try {
    let commentAnswer = await Comment.findById(commentId);
    let session = await mongoose.startSession();
    session.startTransaction();
    await comment.save({ session });
    await commentAnswer.answersIds.push(comment._id);
    await commentAnswer.save({ session });
    await session.commitTransaction();
  } catch {
    return next(new HttpError("Transaction failed", 500));
  }

  res.json({ comment });
};

const deleteComment = (req, res, next) => {};
const likeComment = (req, res, next) => {};
const getCommentsByPostId = async (req, res, next) => {
  // let postId = new mongoose.Types.ObjectId(req.pid);
  // console.log(req.params);
  let page = Number(req.query.page);
  const COMMENT_LIMIT = 5;
  let comments;
  try {
    comments = await Comment.find({
      postId: req.pid,
      answerUser: null,
    })
      .populate("creator")
      .sort({ time: 1 })
      .limit(COMMENT_LIMIT)
      .skip(page * COMMENT_LIMIT)
      .exec();
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!comments) {
    return next(new HttpError("Not found", 404));
  }

  res.json({ comments });
};

const getAnswersOfComment = async (req, res, next) => {
  let postId = req.pid;
  let commentId = req.params.cid;
  let page = req.query.page;
  let comment;
  let COMMENT_LIMIT = 5;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }
  if (!comment) {
    return next(new HttpError("Not found", 404));
  }
  let answers;
  try {
    answers = await Comment.find({ _id: { $in: comment.answersIds } })
      .populate("creator")
      .sort({ time: 1 })
      .limit(COMMENT_LIMIT)
      .skip(page * COMMENT_LIMIT)
      .exec();
  } catch (err) {
    return next(new HttpError("DB error"));
  }
  if (!answers) {
    return next(new HttpError("Not found", 404));
  }

  res.json({ answers });
};

module.exports = {
  insertComment,
  deleteComment,
  likeComment,
  getCommentsByPostId,
  getAnswersOfComment,
};
