const mongoose = require("mongoose");

const thumbnailSchema = new mongoose.Schema({
  url: String,
  width: Number,
  height: Number,
});

const Video = mongoose.model(
  "Video",
  mongoose.Schema({
    _id: String,
    title: { type: String, required: true },
    description: { type: Date, required: false },
    publishedAt: { type: Date, required: true },
    thumbnails: {
      default: thumbnailSchema,
      medium: thumbnailSchema,
      high: thumbnailSchema,
      standard: thumbnailSchema,
      maxres: thumbnailSchema,
    },
  })
);

module.exports = Video;
