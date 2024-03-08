const mysql = require("../models/mysql");

// Controller function to register a student
exports.registerStudent = (req, res) => {
  const { name, email, phone, rollNumber, cgpa10th, cgpa12th, cgpaBtech } =
    req.body;

  // Insert the student data into the database
  const query = `INSERT INTO students (name, email, phone, rollNumber, cgpa10th, cgpa12th, cgpaBtech) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  mysql.query(
    query,
    [name, email, phone, rollNumber, cgpa10th, cgpa12th, cgpaBtech],
    (err, result) => {
      if (err) {
        console.error("Error registering student:", err);
        return res.status(500).json({ error: "Failed to register student" });
      }
      res.status(200).json({ message: "Student registered successfully" });
    }
  );
};

// Controller function to cross-check with the Roll List from Academic Office
exports.crossCheck = (req, res) => {
  // Logic to cross-check student data with the Roll List from Academic Office
  // Implementation depends on how you obtain and store academic office roll list data
};

// Controller function to create job notification form
exports.createJobNotification = (req, res) => {
  const { jobTitle, jobDescription, company, deadline } = req.body;

  // Insert the job notification form data into the database
  const query = `INSERT INTO job_notifications (jobTitle, jobDescription, company, deadline) 
                 VALUES (?, ?, ?, ?)`;
  mysql.query(
    query,
    [jobTitle, jobDescription, company, deadline],
    (err, result) => {
      if (err) {
        console.error("Error creating job notification:", err);
        return res
          .status(500)
          .json({ error: "Failed to create job notification" });
      }
      res
        .status(200)
        .json({ message: "Job notification created successfully" });
    }
  );
};
