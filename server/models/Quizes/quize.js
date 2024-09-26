const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const QuizeSchema = new Schema(
  {
    quizeTopic: String,
    quizeQuestion: String,
    quizAttemptBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
      },
    ],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  },
  {
    timestamps: true,
  }
);

const QuizeModel = mongoose.model("quize", QuizeSchema);
module.exports = QuizeModel;
