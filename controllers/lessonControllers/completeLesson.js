const LearnerModel =
  require("../../models/userModels/learnerModel").LearnerModel;

// This function is used to mark a lesson as complete. A learner type user is
// able to add lessons to their completed lessons array. If the lesson has already
// been completed we also don't add it to the array.
const completeLesson = async (req, res, next) => {
  try {
    const learner = await LearnerModel.findById(res.content.userId, {
      completedLessons: 1,
    });
    if (!learner.completedLessons.includes(req.body.lessonId)) {
      learner.completedLessons.push(req.body.lessonId);
    } else {
      res.json({
        message: "Great work revisiting this lesson!",
      });
      return;
    }
    await learner.save();
    res.status(202);
    res.json({ message: "Lesson completed. Well done!" });
  } catch (err) {
    res.status(400);
    res.json({ message: err.message });
  }
};

module.exports = { completeLesson };
