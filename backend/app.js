const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user-routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(userRoute);

app.use((error, req, res, next) => {
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
    app.listen(5001, "localhost", () => {
      console.log("Server started on port 5000");
    })
  )
  .catch((err) => console.log(err));
