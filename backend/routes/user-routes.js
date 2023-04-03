const express = require("express");

const userController = require("../controllers/user-controller");

const userRoute = express.Router();

userRoute.post("/api/users/signin", userController.signIn);
userRoute.post("/api/users/signup", userController.signUp);

userRoute.get("/api/users/:uid", userController.getUserProfile);

userRoute.post("/api/users/:uid/follows", userController.insertFollow);
userRoute.delete(
  "/api/users/:uid/follows/:followedId",
  userController.deleteFollow
);

userRoute.get("/api/users/:uid/follows", userController.getFollowsByUserId);
userRoute.get("/api/users/:uid/followers", userController.getFollowersByUserId);

module.exports = userRoute;
