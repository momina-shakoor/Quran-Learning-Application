const AskQuestion = require("../../models/askquestion/askquestion");
const Answer = require("../../models/Answer/answer");

// Get all questions
const getQuestions = async (req, res) => {
  try {
    // Remove `.populate("askby", "firstName")` if `askby` is no longer part of the schema
    const questions = await AskQuestion.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a question
const addQuestion = async (req, res) => {
  const { askby, question } = req.body;

  if (!question) {
    console.log("Missing fields:", { askby, question });
    return res.status(400).json({ message: "Question is a required field." });
  }

  try {
    // Create the new question without `askby` if it's no longer part of the schema
    const newQuestion = new AskQuestion({
      question,
    });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all answers
const getAnswers = async (req, res) => {
  try {
    // Populate the question if needed
    const answers = await Answer.find().populate("question");
    res.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add an answer
const addAnswer = async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Question and answer are required fields." });
  }

  try {
    const newAnswer = new Answer({
      question,
      answer,
    });
    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestions,
  addQuestion,
  getAnswers,
  addAnswer,
};
