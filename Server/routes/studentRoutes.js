const axios = require("axios");
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route for student login
// router.post("/login", studentController.login);

// Route for student registration
router.post("/register", studentController.register);

// Endpoint to predict placement likelihood
router.post("/predict", (req, res) => {
  const userData = req.body;

  console.log(userData);
  // Prepare the input in a compatible format
  // const inputData = Object.values(userData);

  let likelihood = 0;

  try {
    // Predict placement likelihood
    // Call Flask API
    axios
      .post("http://127.0.0.1:5000/predict", userData)
      .then((response) => {
        likelihood = response.data;
        res.status(200).json(likelihood);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  } catch (error) {
    console.error("Error during prediction:", error);
    res.status(500).json({ error: "Error during prediction" });
  }
});

module.exports = router;
