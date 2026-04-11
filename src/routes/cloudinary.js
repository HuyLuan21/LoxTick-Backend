const express = require("express");
const {
  getVideoSignature,
  getImageSignature,
} = require("../controllers/cloudinary.controller");

const router = express.Router();

router.get("/signature/video", getVideoSignature);
router.get("/signature/image", getImageSignature);

module.exports = router;
