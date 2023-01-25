const mongoose = require("mongoose");

const connectDB = () => {
  const URL = process.env.DB_URL;
  mongoose.connect(URL, () => {
    console.log("CONNECTION SUCCESSFULLY");
  });
};

module.exports = connectDB;
