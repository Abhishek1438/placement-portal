const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
