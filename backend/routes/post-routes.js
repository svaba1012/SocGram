const express = require("express");

const postController = require("../controllers/post-controller");

const PostRoutes = express.Router();

PostRoutes.get("/api/posts/:pid", postController.getPostById);
PostRoutes.post("/api/posts", postController.insertPost);

module.exports = PostRoutes;
