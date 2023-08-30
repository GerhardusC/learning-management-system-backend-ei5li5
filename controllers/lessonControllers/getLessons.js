const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// This function fetches all the lessons that exist. This list may
// get long, so we are only retrieving the creator, title and tags,
// and omitting the components.
const getLessons = async (req, res, next) => {
  try {
    const allLessons = await LessonModel.find(
      {},
      { id: 1, creator: 1, title: 1, tags: 1 }
    ).populate("creator", "username");
    res.json({ message: "Lessons retrieved", content: allLessons });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { getLessons };
