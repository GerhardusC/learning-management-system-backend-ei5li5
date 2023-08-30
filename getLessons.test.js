const LessonModel = require("./models/contentModels/lessonModel").LessonModel;
const CreatorModel = require("./models/userModels/creatorModel");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://harduscronje:qwewerert@lmsei5li5cluster0.cwhemhu.mongodb.net/LMS?retryWrites=true&w=majority"
);
const getLessons = async () => {
  try {
    const allLessons = await LessonModel.find(
      {},
      { id: 1, creator: 1, title: 1, tags: 1 }
    ).populate("creator", "username");
    return allLessons;
  } catch (err) {
    return err.message;
  }
};

test("Gets lessons", async () => {
  const lessons = await getLessons();
  expect(lessons[0]).toHaveProperty("_id");
});
