const AssignmmentModel = require("../../models/Assignments/assignments");
const CourseModel = require("../../models/Courses/course");

exports.AddAssignment = async (req, res) => {
  const { assignmentTopic, assignmentQuestion, course } = req.body;
  const assignment = assignmentTopic.toLowerCase();
  try {
    const FindAssignment = await AssignmmentModel.findOne({
      assignmentTopic: assignment,
    });
    if (FindAssignment) {
      return res.status(409).json({
        success: false,
        message: "Assignment with this name already exist",
      });
    }
    const findcourse = await CourseModel.findById(course);
    if (!findcourse) {
      return res.status(404).json({
        success: false,
        message: "course not exist",
      });
    }
    console.log(findcourse);

    const newAssignment = new AssignmmentModel({
      assignmentTopic: assignment,
      assignmentQuestion,
      course,
    });

    await newAssignment.save();
    console.log(newAssignment);
    findcourse.assignments.push(newAssignment._id);
    await findcourse.save();
    res.status(200).json({
      success: true,
      message: "Assignment Added Successffully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.AllAssignments = async (req, res) => {
  try {
    const allassignments = await AssignmmentModel.find().populate("course");
    res.status(200).json({
      success: true,
      allassignments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
