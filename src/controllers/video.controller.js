const Video = require("../models/videos.model");
const mongoose = require("mongoose");
const { videoSchema } = require("../validation");

// create video
const createVideo = async (req, res) => {
  try {
    const { error } = videoSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // ❌ return qo‘shildi
    }
    const userId = req.user.id;

    const newVideo = {
         
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      category: req.body.category,
      author: userId
    }
    console.log(userId)
    const video = new Video(newVideo);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all
const getAll = async (req, res) => {
  try {
    let userId = req.user.id; // Foydalanuvchi ID sini olish
    const videos = await Video.find().populate("author", "name avatar");

    const updatedVideos = videos.map(video => ({
      ...video.toObject(),
      hasLiked: video.likes.includes(userId)
    }));

    res.status(200).json(updatedVideos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get by id
const getById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("author", "name email");
    if (!video) return res.status(404).json({ message: "Video topilmadi!" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update by id
const updateById = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!video) return res.status(404).json({ message: "Video topilmadi!" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete by id
const deleteById = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video topilmadi!" });
    res.status(200).json({ message: "Video o'chirildi!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle like
const toggleLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id; // Auth'dan foydalanuvchi ID olinadi

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video topilmadi!" });

    // Foydalanuvchi oldin like bosganmi tekshiramiz
    const likedIndex = video.likes.indexOf(userId);

    if (likedIndex === -1) {
      video.likes.push(userId); // Like qo‘shish
    } else {
      video.likes.splice(likedIndex, 1); // Like olib tashlash
    }

    await video.save();

    res.status(200).json({
      message: likedIndex === -1 ? "Liked" : "Unliked",
      hasLiked: likedIndex === -1,
      likesCount: video.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

module.exports = {
  createVideo,
  getAll,
  getById,
  updateById,
  deleteById,
  toggleLike, // Like funksiyasini eksport qildik
};
