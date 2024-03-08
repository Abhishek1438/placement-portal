const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route for student login
router.post("/login", studentController.login);

// Route for student registration
router.post("/register", studentController.register);

// Route for student dashboard
router.get("/dashboard", studentController.dashboard);

module.exports = router;
