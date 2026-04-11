const { Video } = require("../models");
const AppError = require("../Errors/errors");

const uploadVideo = async (userId, videoData) => {
  const {
    video_url,
    public_id,
    thumbnail_url,
    caption,
    duration,
    resolution_x,
    resolution_y,
    visibility,
    published_at,
    allow_repost,
    allow_comment,
  } = videoData;

  let status = "active";
  if (published_at) {
    const publishTime = new Date(published_at);
    status = publishTime > new Date() ? "processing" : "active";
  }

  const video = await Video.create({
    user_id: userId,
    video_url,
    public_id,
    thumbnail_url,
    caption,
    duration,
    resolution_x,
    resolution_y,
    visibility,
    published_at: published_at ?? new Date(),
    allow_repost: allow_repost ?? true,
    allow_comment: allow_comment ?? true,
    status,
  });

  return video;
};
module.exports = { uploadVideo };
