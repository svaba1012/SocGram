const express = require("express");

const userController = require("../controllers/user-controller");

const userRoutes = express.Router();

userRoutes.post("/signin", userController.signIn);
userRoutes.post("/signup", userController.signUp);

userRoutes.get("/:uid", userController.getUserProfile);

userRoutes.post("/:uid/follows", userController.insertFollow);
userRoutes.delete("/:uid/follows/:followedId", userController.deleteFollow);

userRoutes.get("/:uid/follows", userController.getFollowsByUserId);
userRoutes.get("/:uid/followers", userController.getFollowersByUserId);

module.exports = userRoutes;
