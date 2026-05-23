const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDb() {
  if (!mongoUri) {
    console.warn("MONGODB_URI is not set. Skipping MongoDB connection for local smoke mode.");
    return null;
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = { connectDb };
