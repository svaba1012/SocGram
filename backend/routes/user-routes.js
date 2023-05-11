const express = require("express");

const userController = require("../controllers/user-controller");
const profileImageUpload = require("../middlewares/profileImage-upload");

const userRoutes = express.Router();

userRoutes.post("/signin", userController.signIn);
userRoutes.post("/signup", userController.signUp);

userRoutes.post(
  "/:uid/profileImage",
  profileImageUpload.single("image"),
  userController.changeProfilePicture
);

userRoutes.delete("/:uid/profileImage", userController.removeProfilePicture);

userRoutes.get("/", userController.getUsers);
userRoutes.get("/:username", userController.getUserProfile);

userRoutes.post("/:uid/follows", userController.insertFollow);
userRoutes.delete("/:uid/follows/:followedId", userController.deleteFollow);

userRoutes.get("/:uid/follows", userController.getFollowsByUserId);
userRoutes.get("/:uid/followers", userController.getFollowersByUserId);

module.exports = userRoutes;
