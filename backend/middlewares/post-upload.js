const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const postUpload = multer({
  limits: { fileSize: 5000000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Destinacija");
      cb(null, "uploads/posts");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      const time = new Date().getTime();
      console.log("Filename");
      let uniqueSuffix = time + "-" + Math.round(Math.random() * 1e9);
      cb(null, `image-${uniqueSuffix}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    let isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Wrong file extenision");
    cb(error, isValid);
  },
});

module.exports = postUpload;
