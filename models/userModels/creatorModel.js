const mongoose = require("mongoose");
// A schema that describes a creator user.
const creatorSchema = new mongoose.Schema({
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
});

module.exports.CreatorModel = mongoose.model("creators", creatorSchema);
