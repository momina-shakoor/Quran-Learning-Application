const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: String,
    education: String,
    score: Number,
    cnicNo: Number,
    password: String,
    dateOfBirth: String,
    quiz: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
      },
    ],
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignment",
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", AuthSchema);
module.exports = AuthModel;
