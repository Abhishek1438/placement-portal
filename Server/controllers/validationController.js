const mysql = require("../models/mysql");

// Controller function to validate email ID
exports.validateEmail = (req, res) => {
  const { email } = req.body;

  // Check if email is a college email ID
  const isCollegeEmail = email.endsWith("@college.edu");

  res.status(200).json({ valid: isCollegeEmail });
};

// Controller function to validate phone number
exports.validatePhoneNumber = (req, res) => {
  const { phone } = req.body;

  // Check if phone number matches a valid format (e.g., using regex)
  const isValidFormat = /^\d{10}$/.test(phone);

  res.status(200).json({ valid: isValidFormat });
};

// Controller function to validate roll number
exports.validateRollNumber = (req, res) => {
  const { rollNumber } = req.body;

  // Logic to validate roll number format and check for duplicates
  // Example: Check if roll number already exists in the database
};

// Controller function to validate CGPA
exports.validateCGPA = (req, res) => {
  const { cgpa } = req.body;

  // Check if CGPA is in the correct format (e.g., between 0 and 10)
  const isValidFormat = cgpa >= 0 && cgpa <= 10;

  res.status(200).json({ valid: isValidFormat });
};
