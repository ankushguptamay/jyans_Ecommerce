const path = require("path");
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  const match = ["image/png", "image/jpeg", "image/jpg"];
  if (match.indexOf(file.mimetype) === -1) {
    var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
    return cb(message, null);
  } else {
    cb(null, true);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../Resource/ProductImages`));
  },
  filename: (req, file, callback) => {
    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
uploadProductImages = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadProductImages;