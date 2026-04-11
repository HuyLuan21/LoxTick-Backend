const cloudinary = require("../config/cloudinary");

const getVideoSignature = (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "tiktok_clone/video",
      eager: "q_auto:best,vc_auto,w_720,h_1280,c_limit",
      eager_async: true,
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  res.json({ timestamp, signature, api_key: process.env.CLOUDINARY_API_KEY });
};

const getImageSignature = (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "tiktok_clone/image",
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  res.json({ timestamp, signature, api_key: process.env.CLOUDINARY_API_KEY });
};

module.exports = { getVideoSignature, getImageSignature };
