const jwt = require("jsonwebtoken");
const LearnerModel =
  require("../../models/userModels/learnerModel").LearnerModel;

// This function generates a json web token for a learner.
// If the user enters the correct password, they are returned a
// token containing their username, ID and role.
const localLearnerJWT = async (req, res, next) => {
  try {
    const user = await LearnerModel.findOne(
      { username: req.body.username },
      { username: 1, password: 1, _id: 1 }
    );
    if (!user) {
      res.status(404);
      res.json({ message: "User not found." });
      return;
    }
    if (user.password === req.body.password) {
      const payload = {
        username: req.body.username,
        userId: user._id,
        role: "learner",
      };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "8h",
        algorithm: "HS256",
      });
      res.status(202);
      res.json({
        message: "Success",
        token: token,
        username: req.body.username,
      });
      return;
    } else {
      res.status(403);
      res.json({ message: "Incorrect password." });
      return;
    }
  } catch (err) {
    res.status(400);
    res.json({ message: "Something went wrong." });
  }
};

module.exports = { localLearnerJWT };
