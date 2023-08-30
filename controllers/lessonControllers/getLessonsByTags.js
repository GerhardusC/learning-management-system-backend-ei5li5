const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// This function has been created but not implemented in the front end.
// You can get lessons with a comma separated list of tags.
// You will only be sent back the lessons that include all the tags included.
const getLessonsByTags = async (req, res, next) => {
  try {
    const lessons = await LessonModel.find({
      tags: { $all: req.query.tags.split(",") },
    });
    res.json({ message: "Lesson retrieved", lessons: lessons });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { getLessonsByTags };
