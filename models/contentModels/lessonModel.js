const mongoose = require("mongoose");
// A schema that describes a lesson.
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessonComponents: {
    type: Array,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "creators",
    required: true,
  },
  tags: {
    type: Array,
  },
});

module.exports.LessonModel = mongoose.model("lessons", lessonSchema);
