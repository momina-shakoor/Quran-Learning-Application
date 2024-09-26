const QuizAtpModel = require("../../models/AttemptQuize/attemptquize");
const QuizeModel = require("../../models/Quizes/quize");

exports.Attemptquize = async (req, res) => {
  const { quizAnswer, quiz, attemptBy } = req.body;

  try {
    // Check if the user has already attempted this quiz
    const existingAttempt = await QuizAtpModel.findOne({ attemptBy, quiz });
    if (existingAttempt) {
      return res.status(409).json({
        success: false,
        message: "Submission allowed only one time",
      });
    }

    // Create a new quiz attempt
    const attemptquiz = new QuizAtpModel({
      quizAnswer,
      quiz,
      attemptBy,
    });
    await attemptquiz.save();

    // Update the quiz document to include the user ID in the quizAttemptBy array
    await QuizeModel.findByIdAndUpdate(
      quiz,
      { $addToSet: { quizAttemptBy: attemptBy } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllQuizAttemptsWithDetails = async (req, res) => {
  try {
    const allQuizAttempts = await QuizAtpModel.find()
      .populate({
        path: "attemptBy",
        model: "Auth",
      })
      .populate({
        path: "quiz",
        model: "quize",
      });

    res.status(200).json({
      success: true,
      message: "All quiz attempts with details fetched successfully",
      allQuizAttempts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizAttemptsByQuizId = async (req, res) => {
  const id = req.params.id;

  try {
    const quizAttempts = await QuizAtpModel.find({ quiz: id })
      .populate({
        path: "attemptBy",
        model: "Auth",
      })
      .populate({
        path: "quiz",
        model: "quize",
      });

    res.status(200).json({
      success: true,
      message: "Quiz attempts fetched successfully",
      quizAttempts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
