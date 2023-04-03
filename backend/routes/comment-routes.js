const express = require("express");

const commentController = require("../controllers/comment-controller");

const commentRoutes = express.Router();

commentRoutes.get("/", commentController.getCommentsByPostId);
commentRoutes.post("/", commentController.insertComment);
commentRoutes.delete("/:cid", commentController.deleteComment);

commentRoutes.post("/:cid/answers", commentController.answerComment);

// get answers of comment
// commentRoutes.get("api/posts/:pid/comments/:cid/answers");

commentRoutes.post("/:cid/likes", commentController.likeComment);

module.exports = commentRoutes;
