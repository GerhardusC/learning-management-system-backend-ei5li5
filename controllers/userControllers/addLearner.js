const LearnerModel =
  require("../../models/userModels/learnerModel").LearnerModel;

// This function allows you to add a learner user, it also checks
// whether the email and username already exists before creating the user.
const addLearner = async (req, res, next) => {
  const newLearner = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    completedLessons: [],
  };

  const checkCurrentUsername = await LearnerModel.exists({
    username: req.body.username,
  });
  const checkCurrentEmail = await LearnerModel.exists({
    email: req.body.email,
  });

  if (checkCurrentUsername) {
    res.status(400);
    res.json({ message: "Username already in use." });
    return;
  }

  if (checkCurrentEmail) {
    res.status(400);
    res.json({ message: "Email already in use" });
    return;
  }

  const learner = new LearnerModel(newLearner);
  await learner.save();
  res.message = "User added";
  next();
};

module.exports = { addLearner };
