const mongoose = require("mongoose");

// schema
const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, maxlength: 500 },
    url: { type: String, required: true },
    category: {
      type: String,
      enum: ["sport", "comedy", "music", "other"], // Faqat shu qiymatlar bo'lishi mumkin
      required: true,
      default: "other",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;