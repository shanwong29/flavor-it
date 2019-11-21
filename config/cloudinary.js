const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "images", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  transformation: [
    {
      width: 500,
      height: 500,
      crop: "lfill",
      gravity: "face"
      // radius: "max",
      // background: "rgb:174b5e" // need to figure out if there's a way to add multiple formats. otherwise this wont work
    }
  ],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
  filename: function(req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage });
module.exports = uploadCloud;
