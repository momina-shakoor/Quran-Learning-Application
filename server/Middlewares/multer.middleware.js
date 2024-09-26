const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept file types based on lessonType
    if (req.body.lessonType === "audio" && file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else if (
      req.body.lessonType === "file" &&
      file.mimetype.startsWith("application/")
    ) {
      cb(null, true);
    } else {
      cb(new multer.MulterError("Unexpected field"), false);
    }
  },
});

module.exports = { upload };
