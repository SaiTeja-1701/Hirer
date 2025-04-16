const mongoose = require("mongoose");

const ResumeReportSchema = new mongoose.Schema({
  fileName: String,
  score: Number,
  matched: [String],
  missing: [String],
  jdText: String,
  resumeText: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
});

module.exports = mongoose.model("ResumeReport", ResumeReportSchema);
