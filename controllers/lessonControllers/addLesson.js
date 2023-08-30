const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// This function is used to add a lesson. The request body should include a title, lesson components, tags and a user ID.
const addLesson = async (req, res, next) => {
  try {
    const newLesson = {
      title: req.body.title,
      lessonComponents: req.body.lessonComponents,
      tags: req.body.tags,
      creator: res.content.userId,
    };
    const lesson = new LessonModel(newLesson);
    await lesson.save();
    res.json({ message: "Lesson saved successfully." });
  } catch (err) {
    res.status(400);
    res.json({ message: err.message });
  }
};

module.exports = { addLesson };
