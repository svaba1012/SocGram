const express = require("express");

const postController = require("../controllers/post-controller");

const PostRoutes = express.Router();

PostRoutes.get("/:pid", postController.getPostById);
PostRoutes.post("/", postController.insertPost);
PostRoutes.delete("/:pid", postController.deletePost);

PostRoutes.post("/:pid/likes", postController.likePost);

module.exports = PostRoutes;
