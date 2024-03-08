const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to handle student registration form
router.post("/register", adminController.registerStudent);

// Route to cross-check with the Roll List from Academic Office
router.get("/crosscheck", adminController.crossCheck);

// Route to handle job notification form
router.post("/jobnotification", adminController.createJobNotification);

module.exports = router;
