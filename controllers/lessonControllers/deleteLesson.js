const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

const CreatorModel =
  require("../../models/userModels/creatorModel").CreatorModel;

// This function allows a user to delete a lesson. A lesson can only be
// deleted by the person who created the lesson.
const deleteLesson = async (req, res, next) => {
  try {
    const lesson = await LessonModel.findById(req.body.deletingId);
    const creator = await CreatorModel.findById(lesson.creator, {
      username: 1,
      _id: 1,
    });
    if (creator._id.toString() === res.content.userId) {
      lesson.deleteOne();
      res.status(202);
      res.json({ message: "Successfully deleted lesson." });
    } else {
      res.status(403);
      res.json({ message: "You are not the owner of this lesson." });
    }
  } catch (err) {
    res.json({ message: "Lesson not found." });
  }
};

module.exports = { deleteLesson };
