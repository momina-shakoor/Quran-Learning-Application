const CourseModel = require("../../models/Courses/course");
const QuizeModel = require("../../models/Quizes/quize");
exports.AddQuize = async (req, res) => {
  const { quizeTopic, course, quizeQuestion } = req.body;
  const quizeName = quizeTopic.toLowerCase();
  try {
    const findQuize = await QuizeModel.findOne({ quizeTopic: quizeName });
    if (findQuize) {
      return res.status(409).json({
        success: false,
        message: "Quize Already exist with this name",
      });
    }
    const findCourse = await CourseModel.findById(course);
    if (!findCourse) {
      return res.status(404).json({
        success: false,
        message: "course not exist",
      });
    }
    const newQuize = new QuizeModel({
      quizeTopic: quizeName,
      quizeQuestion,
      course,
    });
    await newQuize.save();
    findCourse.quizes.push(newQuize._id);
    await findCourse.save();
    res.status(200).json({
      success: false,
      message: "Quize Added Successffully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.AllQuizes = async (req, res) => {
  try {
    const allQuizes = await QuizeModel.find().populate("course");
    res.status(200).json({
      success: true,
      allQuizes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleQuiz = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const quiz = await QuizeModel.findById(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz",
      });
    }
    res.status(200).json({
      success: true,
      message: "Quiz found",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
