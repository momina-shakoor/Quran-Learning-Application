const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AssignmentSchema = new Schema(
  {
    assignmentTopic: { type: String, unique: true },
    assignmentQuestion: String,
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    assignmentAttemptBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    ],
    deadline: String,
  },
  {
    timestamps: true,
  }
);

const AssignmentModel = new mongoose.model("assignment", AssignmentSchema);
module.exports = AssignmentModel;
