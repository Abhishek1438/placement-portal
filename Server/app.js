const express = require("express");
const app = express();
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const db = require("./models");
const { authenticateToken } = require("./middlewares/authMiddleware");
const Student = require("./models/Student");
const Admin = require("./models/admin");
const cookieParser = require("cookie-parser");

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.get("/check", authenticateToken, async (req, res) => {
  let user = null;
  if (req.user.role === "admin") {
    user = await Admin.findByPk(req.user.id);
  }
  if (req.user.role === "student") {
    user = await Student.findByPk(req.user.id);
  }
  if (user) {
    return res.status(200).send({ user, role: req.user.role });
  }
  return res.status(400).send({ message: "failuer" });
});
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
