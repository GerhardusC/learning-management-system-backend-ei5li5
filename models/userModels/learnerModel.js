const mongoose = require("mongoose");
// A schema that describes a learner user.
const learnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  completedLessons: [
    {
      type: mongoose.Types.ObjectId,
      ref: "lessons",
    },
  ],
});

module.exports.LearnerModel = mongoose.model("learners", learnerSchema);
