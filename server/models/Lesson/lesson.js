const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonType: {
    type: String,
    enum: ["text", "audio", "file"],
    required: true,
  },
  textLesson: {
    type: String,
  },
  audioFile: {
    type: String,
  },
  otherFile: {
    type: String,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
