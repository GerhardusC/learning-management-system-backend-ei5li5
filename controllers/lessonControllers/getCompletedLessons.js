const LearnerModel =
  require("../../models/userModels/learnerModel").LearnerModel;
const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

// A function that retrieves all the completed lessons for a certain user.
// The user's ID is obtained from their token, which was stored in res.content
const getCompletedLessons = async (req, res, next) => {
  try {
    const completeIds = await LearnerModel.findById(res.content.userId, {
      completedLessons: 1,
    });
    // Because we will possible be loading many lessons, we don't include the lesson
    // components, because this will be too much info. We only use the title, creator
    // and tags.
    const completeLessons = await LessonModel.find(
      {
        _id: { $in: completeIds.completedLessons },
      },
      { title: 1, creator: 1, tags: 1 }
      // Here we make sure not to populate the passwords of the creator,
      // we are only interested in their username.
    ).populate("creator", "username");

    res.status(202);
    res.json({ message: "Lessons retrieved.", content: completeLessons });
  } catch (err) {
    res.status(400);
    res.json({ message: err.message });
  }
};

module.exports = { getCompletedLessons };
