const { uploadOnCloudinary } = require("../../Utilities/cloudinary");
const Lesson = require("../../models/Lesson/lesson");

const createLesson = async (req, res) => {
  try {
    let fileUrl = "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      fileUrl = result ? result.secure_url : "";
    }

    const lesson = new Lesson({
      lessonType: req.body.lessonType,
      textLesson:
        req.body.lessonType === "text" ? req.body.textLesson : undefined,
      audioFile: req.body.lessonType === "audio" ? fileUrl : undefined,
      otherFile: req.body.lessonType === "file" ? fileUrl : undefined,
    });

    await lesson.save();
    res.status(201).json({ message: "Lesson created successfully!" });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({ message: "Error creating lesson" });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Error fetching lessons" });
  }
};
const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the lesson by ID
    const lesson = await Lesson.findByIdAndDelete(id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    res.status(500).json({ message: "Error deleting lesson" });
  }
};

module.exports = { createLesson, getLessons, deleteLesson };
