require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// routes
const authRoutes = require("./src/routes/auth.routes");
const usersRoutes = require("./src/routes/users.routes")
const videoRoutes = require("./src/routes/video.routes");

const connectDB = require("./src/config/db");

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/videos", videoRoutes);

// listen
let PORT = process.env.PORT || 5001;

connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  })
);
