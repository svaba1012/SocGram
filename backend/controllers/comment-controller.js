const insertComment = (req, res, next) => {};
const deleteComment = (req, res, next) => {};
const likeComment = (req, res, next) => {};
const getCommentsByPostId = async (req, res, next) => {
  let { pid } = req.params;
  let comments;
  try {
    comments = await Comment.find({ postId: pid }).populate("creator");
  } catch (err) {
    return next(new HttpError("DB error", 500));
  }

  if (!comments) {
    return next(new HttpError("Not found", 404));
  }

  res.json({ comments });
};
const answerComment = (req, res, next) => {};

module.exports = {
  insertComment,
  deleteComment,
  likeComment,
  getCommentsByPostId,
  answerComment,
};
