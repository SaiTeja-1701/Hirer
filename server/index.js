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
  
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors")
const path = require("path");
const User = require("./Model/user")
const router = require('./routes/user');
const multer = require("multer");
const cookieParser = require('cookie-parser');
const checkCookies = require('./middlewares/auth');
const Resume = require("./Model/resume")
const bcrypt = require("bcryptjs")
app.use("/resumes", express.static(path.join(__dirname, "Public/resumes")));
const JWT_SECRET = "mohit@123";
mongoose
  .connect("mongodb://127.0.0.1:27017/ATS")
  .then(() => console.log("connection established"))
  .catch(() => console.log("connection failed"));
//views

//Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkCookies("token"));
app.use('/user', router);

// app.post('/signup', async (req, res) => {
//   const { username, password, email } = req.body;
//   console.log("Signup body received:", req.body);
//   try {
//     const userExists = await User.findOne({ $or: [{ username }, { email }] });
//     if (userExists) {
//       return res.json({message:"user already exists with same email or password"});
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     await User.create({ username, password: hashedPassword, email });

//     return res.json({message:"Login Succesfull"});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ result: false, error: err.message });
//   }
// });
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log(user)
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("isMatch: " + isMatch)
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     console.log("token: " + token)
//     res.json({ token});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "Public/resumes");
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🟢 Upload Resume Route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const resume = new Resume({
      originalName: file.originalname,
      fileName: file.filename,
      filePath: `/resumes/${file.filename}`, // relative public URL
    });

    await resume.save();

    res.status(200).json({ message: "Resume uploaded successfully", resume });
  } catch (err) {
    res.status(500).json({ error: "Error uploading resume" });
  }
});
app.listen(5000,()=>{
    console.log("server running on the port 5000")
})
