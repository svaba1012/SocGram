const express = require("express");

const postController = require("../controllers/post-controller");
const postUpload = require("../middlewares/post-upload");

const PostRoutes = express.Router();

PostRoutes.get("/", postController.getPosts);
PostRoutes.get("/:pid", postController.getPostById);
PostRoutes.post("/", postUpload.array("images"), postController.insertPost);
PostRoutes.delete("/:pid", postController.deletePost);

PostRoutes.post("/:pid/likes", postController.likePost);
PostRoutes.delete("/:pid/likes/:uid", postController.removePostLike);

module.exports = PostRoutes;
