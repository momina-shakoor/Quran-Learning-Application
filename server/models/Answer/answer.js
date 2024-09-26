const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AskQuestion",
    required: true,
  }, // Reference to the AskQuestion model
  answer: { type: String, required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
});

module.exports = mongoose.model("Answer", answerSchema);
