const express = require("express");

const postController = require("../controllers/post-controller");
const postUpload = require("../middlewares/post-upload");

const PostRoutes = express.Router();

PostRoutes.get("/:pid", postController.getPostById);
PostRoutes.post("/", postUpload.array("images", 10), postController.insertPost);
PostRoutes.delete("/:pid", postController.deletePost);

PostRoutes.post("/:pid/likes", postController.likePost);

module.exports = PostRoutes;
