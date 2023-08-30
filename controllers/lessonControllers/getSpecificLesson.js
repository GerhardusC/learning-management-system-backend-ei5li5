const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// This function allows you to get a lesson by ID. This retrieves
// the entire lesson, because it will likely have been requested for
// viewing if it is requested by id.
const getSpecificLesson = async (req, res, next) => {
  try {
    const lesson = await LessonModel.findById(req.query.lessonId);
    res.json({ message: "Lesson retrieved", content: lesson });
  } catch (err) {
    res.json({ message: "Failed to retrieve lesson" });
  }
};

module.exports = { getSpecificLesson };
