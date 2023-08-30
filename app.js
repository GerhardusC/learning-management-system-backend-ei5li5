// All the imports.
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const addCreator =
  require("./controllers/userControllers/addCreator").addCreator;
const addLearner =
  require("./controllers/userControllers/addLearner").addLearner;
const validateRegisterInfo =
  require("./middleware/validateRegisterInfo").validateRegisterInfo;
const verifyToken = require("./middleware/auth/verifyToken").verifyToken;
const localCreatorToken =
  require("./middleware/auth/localCreatorToken").localCreatorJWT;
const localLearnerToken =
  require("./middleware/auth/localLearnerToken").localLearnerJWT;
const addLesson =
  require("./controllers/lessonControllers/addLesson").addLesson;
const editLesson =
  require("./controllers/lessonControllers/editLesson").editLesson;
const deleteLesson =
  require("./controllers/lessonControllers/deleteLesson").deleteLesson;
const getLessons =
  require("./controllers/lessonControllers/getLessons").getLessons;
const getOwnLessons =
  require("./controllers/lessonControllers/getOwnLessons").getOwnLessons;
const getSpecificLesson =
  require("./controllers/lessonControllers/getSpecificLesson").getSpecificLesson;
const getLessonsByTags =
  require("./controllers/lessonControllers/getLessonsByTags").getLessonsByTags;
const completeLesson =
  require("./controllers/lessonControllers/completeLesson").completeLesson;
const getCompletedLessons =
  require("./controllers/lessonControllers/getCompletedLessons").getCompletedLessons;
const handleRedirect = require("./middleware/auth/googleToken").handleRedirect;
const genGoogleToken = require("./middleware/auth/googleToken").genToken;

const PORT = process.env.PORT || 3001;
const app = express();

// Global middleware and connecting to DB.
app.use(express.json());
app.use(cors());
app.use(helmet());
mongoose.connect(
  "mongodb+srv://harduscronje:qwewerert@lmsei5li5cluster0.cwhemhu.mongodb.net/LMS?retryWrites=true&w=majority"
);

// Google stuff, currently inactive.
app.get("/oauth", handleRedirect);
app.post("/register_creator_google", genGoogleToken);

// Adding user endpoints.

app.post(
  "/register_creator",
  validateRegisterInfo,
  addCreator,
  localCreatorToken
);

app.post(
  "/register_learner",
  validateRegisterInfo,
  addLearner,
  localLearnerToken
);

// Login user endpoints

app.post("/login_creator", localCreatorToken);

app.post("/login_learner", localLearnerToken);

// Create lesson endpoint

app.post("/creator/new_lesson", verifyToken, addLesson);

// Edit lesson endpoint

app.put("/creator/edit_lesson", verifyToken, editLesson, (req, res) => {
  res.json({ message: res.message });
});

// Delete lesson endpoint

app.delete("/creator/delete_lesson", verifyToken, deleteLesson);

// View lessons endpoints

app.get("/lessons", verifyToken, getLessons);

app.get("/own_lessons", verifyToken, getOwnLessons);

app.get("/specific_lesson", verifyToken, getSpecificLesson);

app.get("/lessons_by_tags", verifyToken, getLessonsByTags);

app.get("/learner/completed_lessons", verifyToken, getCompletedLessons);

// Complete lesson endpoint

app.post("/learner/complete_lesson", verifyToken, completeLesson);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
