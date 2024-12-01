const express = require("express");
const {
  studentLogin,
  resetPasswordEmail,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/student/login", studentLogin);
router.post("/student/reset-password-email", resetPasswordEmail);
router.post("/student/reset-password", resetPassword);

module.exports = router;
