const mysql = require("../models/mysql");
const RollList = require("../models/RollList");
const JobNotification = require("../models/JobNotification");
const csv = require("csv-parser");
const fs = require("fs");
const xlsx = require("xlsx");
const { sendEmail } = require("../services/emailService");

exports.getAllRolls = async (req, res) => {
  try {
    // Fetch all roll entries from the database
    const rollList = await RollList.findAll();

    // Send a response with the retrieved data
    res.status(200).json({
      message: "Roll list fetched successfully.",
      data: rollList,
    });
  } catch (error) {
    console.error("Error fetching the roll list:", error);
    res.status(500).json({
      message: "An error occurred while fetching the roll list.",
      error,
    });
  }
};

exports.uploadRollList = async (req, res) => {
  try {
    // Load the uploaded Excel file
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);

    // Assuming the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Define validation patterns and rules
    const rollNoPattern = /^S(?:20[1-9][1-9])00[1-3][0-9]{4}$/;
    const emailPattern =
      /^[a-zA-Z]+\.[a-zA-Z]{1}[1-4][0-9]@(?:iiits\.in|IIITS\.IN)$/;
    const validBranches = ["CSE", "ECE", "AI and ML"];

    // Process each row
    const promises = data.map(async (row) => {
      const errors = [];
      const rollNumber = row["Roll Number"];
      const email = row["Email"];
      const branch = row["Branch"] || "CSE";
      const cgpa = parseFloat(row["CGPA"]);

      // Validate roll number
      if (!rollNoPattern.test(rollNumber)) {
        errors.push("Invalid roll number.");
      }

      // Validate email (if email column exists)
      if (email && !emailPattern.test(email)) {
        errors.push("Invalid email.");
      }

      // Validate branch
      if (!validBranches.includes(branch)) {
        errors.push("Invalid branch.");
      }

      // Validate CGPA
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        errors.push("Invalid CGPA.");
      }

      const errorMessage = errors.length > 0 ? errors.join(", ") : null;

      // Check if the roll number already exists
      const existingRow = await RollList.findOne({ where: { rollNumber } });

      if (existingRow) {
        console.log(`Roll number ${rollNumber} already exists.`);
        return null; // Skip adding if roll number already exists
      } else {
        // Insert row with error message (or null if no errors)
        return RollList.create({
          rollNumber,
          name: row["Name"],
          email,
          branch,
          cgpa,
          error: errorMessage,
        });
      }
    });

    await Promise.all(promises);

    // Remove the uploaded file
    fs.unlinkSync(filePath);

    const rollList = await RollList.findAll();

    res
      .status(200)
      .json({ message: "File processed, data saved successfully!", rollList });
  } catch (error) {
    console.error("Error processing the file:", error);

    // Remove the file if an error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res
      .status(500)
      .json({ message: "An error occurred while processing the file.", error });
  }
};

exports.addSingleRoll = async (req, res) => {
  try {
    // Get data from the request body
    const { rollNumber, name, branch, cgpa, email } = req.body;

    // Define validation patterns and rules
    const rollNoPattern = /^S(?:20[1-9][1-9])00[1-3][0-9]{4}$/;
    const emailPattern =
      /^[a-zA-Z]+\.[a-zA-Z]{1}[1-4][0-9]@(?:iiits\.in|IIITS\.IN)$/;
    const validBranches = ["CSE", "ECE", "AI and ML"];

    // Validate the input data
    const errors = [];
    if (!rollNoPattern.test(rollNumber)) {
      errors.push("Invalid roll number.");
    }

    if (email && !emailPattern.test(email)) {
      errors.push("Invalid email.");
    }

    if (!validBranches.includes(branch)) {
      errors.push("Invalid branch.");
    }

    if (isNaN(parseFloat(cgpa)) || cgpa < 0 || cgpa > 10) {
      errors.push("Invalid CGPA.");
    }

    // Check if the roll number already exists in the database
    const existingRow = await RollList.findOne({
      where: { rollNumber },
    });

    if (existingRow) {
      return res.status(400).json({
        message: `Roll number ${rollNumber} already exists.`,
      });
    }

    const errorMessage = errors.length > 0 ? errors.join(", ") : null;

    // Insert the new roll data into the database
    const newRoll = await RollList.create({
      rollNumber,
      name,
      branch,
      cgpa,
      email, // Add email to the database record
      error: errorMessage, // No errors for valid rows
    });

    // Send a success response
    res.status(201).json({
      message: "Row added successfully!",
      newRoll,
    });
  } catch (error) {
    console.error("Error adding the roll:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the roll.", error });
  }
};

exports.updateRoll = async (req, res) => {
  try {
    // Extract roll number from the route parameters
    const { rollNumber } = req.params;

    // Get the new data from the request body
    const { rollNumber: newRollNumber, name, email, branch, cgpa } = req.body;

    // Define validation patterns and rules
    const rollNoPattern = /^S(?:20[1-9][1-9])00[1-3][0-9]{4}$/;
    const emailPattern =
      /^[a-zA-Z]+\.[a-zA-Z]{1}[1-4][0-9]@(?:iiits\.in|IIITS\.IN)$/;
    const validBranches = ["CSE", "ECE", "AI and ML"];

    // Check if the roll number exists in the database
    const existingRow = await RollList.findOne({
      where: { rollNumber },
    });

    if (!existingRow) {
      return res.status(404).json({
        message: `Roll number ${rollNumber} not found.`,
      });
    }

    // Initialize an array to collect validation errors
    const errors = [];

    // Validate the new roll number
    if (newRollNumber && !rollNoPattern.test(newRollNumber)) {
      errors.push("Invalid roll number format.");
    }

    // Validate the name (basic validation for non-empty name)
    if (name && name.trim().length === 0) {
      errors.push("Name cannot be empty.");
    }

    // Validate the email
    if (email && !emailPattern.test(email)) {
      errors.push("Invalid email format.");
    }

    // Validate the branch
    if (branch && !validBranches.includes(branch)) {
      errors.push("Invalid branch.");
    }

    // Validate the CGPA
    if (cgpa) {
      const cgpaFloat = parseFloat(cgpa);
      if (isNaN(cgpaFloat) || cgpaFloat < 0 || cgpaFloat > 10) {
        errors.push("Invalid CGPA value.");
      }
    }
    const errorMessage = errors.length > 0 ? errors.join(", ") : null;

    console.log(newRollNumber);
    if (name) existingRow.name = name;
    if (email) existingRow.email = email;
    if (branch) existingRow.branch = branch;
    if (cgpa) existingRow.cgpa = parseFloat(cgpa);
    if (errors) existingRow.error = errorMessage;

    // Save the updated record
    await existingRow.save();

    if (newRollNumber !== rollNumber) {
      const transaction = await RollList.sequelize.transaction();

      try {
        await RollList.create(
          {
            rollNumber: newRollNumber,
            name: name,
            email: email,
            branch: branch,
            cgpa: parseFloat(cgpa),
            error: errorMessage,
          },
          { transaction }
        );

        await RollList.destroy({
          where: { rollNumber: rollNumber },
          transaction,
        });

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    }

    // Send a success response
    res.status(200).json({
      message: "Roll updated successfully!",
      updatedRoll: existingRow,
    });
  } catch (error) {
    console.error("Error updating the roll:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the roll.", error });
  }
};

exports.deleteRoll = async (req, res) => {
  try {
    // Extract roll number from the route parameters
    const { rollNumber } = req.params;

    // Check if the roll number exists in the database
    const existingRow = await RollList.findOne({
      where: { rollNumber },
    });

    if (!existingRow) {
      return res.status(404).json({
        message: `Roll number ${rollNumber} not found.`,
      });
    }

    // Delete the record
    await RollList.destroy({
      where: { rollNumber },
    });

    // Send success response
    res.status(200).json({
      message: `Roll number ${rollNumber} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting the roll:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the roll.", error });
  }
};

// Controller function to register a student
exports.registerStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Validate and sanitize data if necessary

    // Save to database
    const newStudent = await Student.create(studentData);

    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error saving student data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving student data", error });
  }
};

// Controller function to create job notification form
exports.createJobNotification = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      companyName,
      website,
      linkedIn,
      address,
      workLocation,
      jobDesignation,
      typeOfEmployment,
      eligibilityCriteria,
      applicableBranch,
      stipend,
      ctc,
      otherBenefits,
      bond,
      jobDescription,
      aboutCompany,
      selectionProcess,
      contactName,
      contactDesignation,
      contactEmail,
      contactMobile,
    } = req.body;

    // Create a new job notification record
    const jobNotification = await JobNotification.create({
      companyName,
      website,
      linkedIn,
      address,
      workLocation,
      jobDesignation,
      typeOfEmployment,
      eligibilityCriteria,
      applicableBranch,
      stipend,
      ctc,
      otherBenefits,
      bond,
      jobDescription,
      aboutCompany,
      selectionProcess,
      contactName,
      contactDesignation,
      contactEmail,
      contactMobile,
    });

    res.status(201).json({
      message: "Job notification saved successfully!",
      jobNotification,
    });
  } catch (error) {
    console.error("Error saving job notification:", error);
    res.status(500).json({
      message: "An error occurred while saving the job notification.",
      error,
    });
  }
};

exports.sendMail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail(to, subject, text, html);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
};
