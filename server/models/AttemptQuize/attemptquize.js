const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const quizAtpSchema = new Schema(
  {
    quizAnswer: String,
    attemptBy: {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quizes",
    },
  },
  {
    timestamps: true,
  }
);

const QuizAtpModel = new mongoose.model("quizatpm", quizAtpSchema);
module.exports = QuizAtpModel;
