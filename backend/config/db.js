const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connectDB };
