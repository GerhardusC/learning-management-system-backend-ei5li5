const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

// This file is currently unused.
// This is following the OAuth2 protocol, a request is sent to Google,
// then Google runs a get request to "http://localhost:3001/oauth",
// which would be handled by the handleRedirect function.
const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3001/oauth"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const url = oauth2client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

const genToken = async (req, res, next) => {
  console.log("hi");

  res.json({ message: "Redirect ready.", url: url });
};

const handleRedirect = async (req, res, next) => {
  try {
    const { tokens } = await oauth2client.getToken(req.query.code);
    console.log(tokens);
    res.redirect(
      `http://localhost:3000/creator_dashboard?token=${tokens.id_token}`
    );
  } catch {
    res.status(404);
    res.json({ message: "No authorization." });
  }
};

module.exports = { genToken, handleRedirect };
