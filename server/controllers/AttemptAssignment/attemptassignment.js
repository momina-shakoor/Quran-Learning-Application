const AssignmentAtpModel = require("../../models/AttemptAssignment/attemptassignment");
const { findById } = require("../../models/Autrh/auth");

exports.Attemptassignment = async (req, res) => {
  const { assignmentAnswer, assignment, attemptBy } = req.body;
  try {
    const findalreadyresponse = await AssignmentAtpModel.findOne({ attemptBy });
    if (findalreadyresponse) {
      return res.status(409).json({
        success: false,
        message: "Submission allow only one time",
      });
    }
    const attemptassignment = new AssignmentAtpModel({
      assignmentAnswer,
      assignment,
      attemptBy,
    });
    await attemptassignment.save();
    res.status(200).json({
      success: true,
      message: "Assignment Submitt Successffully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetAllassignmentAttemps = async (req, res) => {
  try {
    const allassignmentAttempts = await AssignmentAtpModel.find().populate(
      "attemptBy",
      "assignment"
    );
    console.log(allassignmentAttempts);
    res.status(200).json({
      success: true,
      message: "All assignmentes Attempts",
      allassignmentAttempts,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
