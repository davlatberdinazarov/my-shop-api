const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createVideo, getAll, getById, updateById, deleteById, toggleLike } = require("../controllers/video.controller");


const router = express.Router();

// ROUTES
router.post("/create", authMiddleware, createVideo )
router.get("/getAll", authMiddleware, getAll )
router.get("/getById/:id", getById)
router.put("/update/:id", authMiddleware, updateById)
router.delete("/deleteById/:id", authMiddleware, deleteById)
router.put('/:videoId/like', authMiddleware, toggleLike)

module.exports = router;