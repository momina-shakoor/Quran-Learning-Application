const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const AssignmentAtpSchema = new Schema({
  assignmentAnswer: String,
  attemptBy: {
    type: Schema.Types.ObjectId,
    ref: "students",
  },
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "assignments",
  },
});

const AssignmentAtpModel = new mongoose.model(
  "assignmentatpm",
  AssignmentAtpSchema
);
module.exports = AssignmentAtpModel;
