const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  title: {
    type: String,
    reqruied: true,
  },
  tag: {
    type: String,
    reqruied: true,
  },
  link: {
    type: String,
    reqruied: true,
  },
  image: {
    // data: Buffer,
    // contentType: String,
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", Project);
