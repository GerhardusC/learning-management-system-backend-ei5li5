// This function just looks at the user's registration info
// and sees if it is valid.
const validateRegisterInfo = (req, res, next) => {
  // The username, email and password need to exist.
  if (req.body.username && req.body.email && req.body.password) {
    // The username needs to be longer than 2 characters and shorter than 18.
    if (req.body.username.length > 18 || req.body.username.length < 2) {
      res.status(400);
      res.json({
        message:
          "Username can't be shorter than 2 or longer than 18 characters.",
      });
      return;
    }
    // This is very loosely checking if the entered email is a valid email address.
    // It has to include an @ symbol, and the @ must be at least 3 characters from the
    // end of the address.
    if (
      !req.body.email.includes("@") ||
      req.body.email.indexOf("@") > req.body.email.length - 3 ||
      !req.body.email.includes(".")
    ) {
      res.status(400);
      res.json({ message: "Email address does not appear valid." });
      return;
    }
    // If validation is passed we go next.
    next();
  } else {
    res.status(400);
    res.json({ message: "missing information" });
    return;
  }
};

module.exports = { validateRegisterInfo };
