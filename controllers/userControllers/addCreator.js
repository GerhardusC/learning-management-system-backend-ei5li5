const CreatorModel =
  require("../../models/userModels/creatorModel").CreatorModel;

// This function allows you to add a creator to the database.
// The creator requires a username, password and email address.
// If the username or email already exists, we respond accordingly.
const addCreator = async (req, res, next) => {
  const newCreator = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  const checkCurrentUsername = await CreatorModel.exists({
    username: req.body.username,
  });
  const checkCurrentEmail = await CreatorModel.exists({
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

  const creator = new CreatorModel(newCreator);
  await creator.save();
  res.message = "User added";
  next();
};

module.exports = { addCreator };
