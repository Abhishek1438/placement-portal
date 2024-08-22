const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { route } = require("./studentRoutes");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/getAllRolls", adminController.getAllRolls);

router.post(
  "/upload-roll-list",
  upload.single("rollList"),
  adminController.uploadRollList
);

router.post("/addRoll", adminController.addSingleRoll);

router.put("/updateRoll/:rollNumber", adminController.updateRoll);

router.delete("/deleteRoll/:rollNumber", adminController.deleteRoll);

router.post("/mail", adminController.sendMail);

router.post("/register", adminController.registerStudent);

// Route to cross-check with the Roll List from Academic Office
// router.get("/crosscheck", adminController.crossCheck);

// Route to handle job notification form
router.post("/jobnotification", adminController.createJobNotification);
module.exports = router;

// const express = require('express');
