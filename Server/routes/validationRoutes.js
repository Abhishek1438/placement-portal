// need attention

const express = require("express");
const router = express.Router();
const validationController = require("../controllers/validationController");

// Route to validate email ID
router.post("/validate-email", validationController.validateEmail);

// Route to validate phone number
router.post("/validate-phone", validationController.validatePhoneNumber);

// Route to validate roll number
router.post("/validate-roll", validationController.validateRollNumber);

// Route to validate CGPA
router.post("/validate-cgpa", validationController.validateCGPA);

module.exports = router;
