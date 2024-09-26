const mongoose = require("mongoose");

const askQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  askby: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }], // Reference to the Answer model
});

module.exports = mongoose.model("AskQuestion", askQuestionSchema);
