const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// This function verifies the token and sets the payload to the
// response object at res.content.
const verifyToken = (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    res.content = decodedToken;
    res.status(202);
    next();
  } catch (err) {
    res.status(400);
    res.json({ message: "Failed to verify token." });
  }
};

module.exports = { verifyToken };
