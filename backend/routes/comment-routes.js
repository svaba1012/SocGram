const express = require("express");

const commentController = require("../controllers/comment-controller");

const commentRoutes = express.Router();

commentRoutes.get("/", commentController.getCommentsByPostId);
commentRoutes.post("/", commentController.insertComment);
commentRoutes.delete("/:cid", commentController.deleteComment);

// get answers of comment
commentRoutes.get("/:cid/answers", commentController.getAnswersOfComment);

commentRoutes.post("/:cid/likes", commentController.likeComment);

module.exports = commentRoutes;
