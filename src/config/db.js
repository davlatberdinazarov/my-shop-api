const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDBga muvaffaqiyatli ulandi!");
  } catch (error) {
    console.error("MongoDBga ulanishda xatolik:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
