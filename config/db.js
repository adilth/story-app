const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });
    console.log("Connected to mongodb");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
