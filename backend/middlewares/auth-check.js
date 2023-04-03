const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new HttpError("Unauthorized", 401));
    }
    let decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Unauthorized", 401));
  }
};
