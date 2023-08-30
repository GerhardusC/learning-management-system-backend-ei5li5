const LessonModel =
  require("../../models/contentModels/lessonModel").LessonModel;

const CreatorModel =
  require("../../models/userModels/creatorModel").CreatorModel;

// This function allows a user  to edit a lesson only if they are the owner of the lesson.
// The body of the request must include the ID of the lesson the user is trying to edit,
const editLesson = async (req, res, next) => {
  try {
    const revisedLesson = await LessonModel.findById(req.body.editingId);
    const lessonCreator = await CreatorModel.findById(
      revisedLesson.creator._id,
      {
        username: 1,
        _id: 1,
      }
    );
    // This is to make sure the user is the owner of the lesson.
    if (lessonCreator._id.toString() === res.content.userId) {
      revisedLesson.lessonComponents = req.body.lessonComponents;
      revisedLesson.title = req.body.title;
      revisedLesson.tags = req.body.tags;
      await revisedLesson.save();
      res.status(202);
      res.json({ message: "Lesson updated." });
    } else {
      res.status(403);
      res.json({ message: "You are not the owner of this lesson." });
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    res.json({ message: err.message });
  }
};

module.exports = { editLesson };
