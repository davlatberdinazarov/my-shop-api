const express = require("express");
const { authRegister, authLogin, authProfile, updateProfile } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const router = express.Router();

// Registratsiya
router.post("/register", authRegister);

// Login
router.post("/login", authLogin);

// Himoyalangan route (faqat token orqali kirish mumkin)
router.get("/profile", authMiddleware, authProfile);
router.patch("/profile-update", authMiddleware, upload.single("avatar"), updateProfile);

module.exports = router;
