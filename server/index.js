const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));



  const ResumeReport = require("./models/ResumeReport");

  // after calculating score...
  const report = new ResumeReport({
    fileName: req.file.originalname,
    score,
    matched,
    missing,
    jdText: jd,
    resumeText: resumeText,
  });
  await report.save();
  res.json(report);
  

  app.get("/api/report/:id", async (req, res) => {
    const report = await ResumeReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Not found" });
    res.json(report);
  });
  