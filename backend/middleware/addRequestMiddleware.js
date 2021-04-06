const multer = require("multer");
const util = require("util");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/image");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const addRequestFMUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error("Invalid MIME type");
    cb(error, isValid);
  },
});

const addRequestMiddleware = util.promisify(
  addRequestFMUpload.array("imgCollection", 5)
);

module.exports = addRequestMiddleware;
