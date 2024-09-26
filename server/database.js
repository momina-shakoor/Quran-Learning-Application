require("dotenv").config();
const mongoose = require("mongoose");

const localUri = process.env.LOCAL_DB_URI;
const atlasUri = process.env.ATLAS_DB_URI;

// Choose the database URI based on the environment
const mongoUri = process.env.NODE_ENV === "production" ? atlasUri : localUri;

const connectDB = () => {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully!");
    })
    .catch((error) => {
      console.log("Error in Connecting Database:", error);
    });
};

module.exports = connectDB;
