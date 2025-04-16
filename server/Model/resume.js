const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  originalName: String,
  fileName: String,
  filePath: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;