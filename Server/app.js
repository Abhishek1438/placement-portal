const express = require("express");
const app = express();
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
require("dotenv").config();
const db = require("./models");

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

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
