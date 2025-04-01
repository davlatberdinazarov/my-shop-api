const jwt = require("jsonwebtoken");

// JWT ni tekshirish middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token topilmadi yoki noto‘g‘ri formatda!" });
  }

  try {
    const actualToken = token.split(" ")[1]; // "Bearer <token>" dan tokenni ajratib olish
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Noto‘g‘ri yoki eskirgan token!" });
  }
};


module.exports = authMiddleware;