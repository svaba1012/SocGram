const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const commentRoutes = require("./routes/comment-routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads/posts", express.static(path.join("uploads", "posts")));
app.use(
  "/uploads/profileImages",
  express.static(path.join("uploads", "profileImages"))
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(
  "/api/posts/:pid/comments",
  (req, res, next) => {
    req.pid = req.params.pid;
    next();
  },
  commentRoutes
);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (req.files) {
    console.log("Ugradi brisanje fajlova");
    console.log(req.files);
  }
  if (res.headerSent) {
    return next(error);
  }
  return res
    .status(error.code || 404)
    .json({ message: error.message || "Unknown error" });
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() =>
    app.listen(5000, "localhost", () => {
      console.log("Server started on port 5000");
    })
  )
  .catch((err) => console.log(err));
