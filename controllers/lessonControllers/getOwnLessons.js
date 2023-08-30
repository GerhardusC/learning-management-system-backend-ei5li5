const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// This function allows a creator to retrieve all of the lessons they
// created. Again we only need the id, title and tags for the lesson,
// we don't need the lesson components.
const getOwnLessons = async (req, res, next) => {
  try {
    const myLessons = await LessonModel.find(
      { creator: res.content.userId },
      { _id: 1, title: 1, tags: 1 }
    );
    res.json({ message: "Lessons retrieved", content: myLessons });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { getOwnLessons };
