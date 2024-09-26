const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const CourseSchema = new Schema({
    courseName: String,
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment'
    }],
    quizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "quize"
    }],
});

const CourseModel = new mongoose.model("course", CourseSchema);
module.exports = CourseModel;
