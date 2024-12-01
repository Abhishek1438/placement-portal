const RollList = require("../models/RollList");
const Student = require("../models/Student");
// const joblib = require("joblib-js");

// Controller function for student login
// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   // Validate username and password against database
//   // Example query:
//   const query = `SELECT * FROM students WHERE username = ? AND password = ?`;
//   mysql.query(query, [username, password], (err, result) => {
//     if (err) {
//       console.error("Error logging in:", err);
//       return res.status(500).json({ error: "Failed to log in" });
//     }
//     if (result.length === 0) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }
//     res.status(200).json({ message: "Login successful", user: result[0] });
//   });
// };

// Controller function for student registration

exports.register = async (req, res) => {
  const {
    RollNo,
    allAgree,
    alreadyPlaced,
    branch,
    cgpa,
    email,
    gender,
    lor,
    name,
    phoneNo,
    wantToRegister,
  } = req.body;

  try {
    // Step 1: Fetch the roll list entry for the student
    const studentRollEntry = await RollList.findOne({
      where: { rollNumber: RollNo },
    });

    // Step 2: If the student is not found in the roll list, return an error
    if (!studentRollEntry) {
      return res.status(400).json({
        error: `Roll number ${RollNo} not found in the roll list. contact Academic office`,
      });
    }

    // Step 3: Check if the fields match the roll list entry
    const errors = [];

    if (studentRollEntry.name !== name) {
      errors.push(
        `Name does not match: expected "${studentRollEntry.name}", received "${name}".`
      );
    }
    if (studentRollEntry.email !== email) {
      errors.push(
        `Email does not match: expected "${studentRollEntry.email}", received "${email}".`
      );
    }
    if (studentRollEntry.branch !== branch) {
      errors.push(
        `Branch does not match: expected "${studentRollEntry.branch}", received "${branch}".`
      );
    }
    // if (studentRollEntry.gender !== gender) {
    //   errors.push(
    //     `Gender does not match: expected "${studentRollEntry.gender}", received "${gender}".`
    //   );
    // }
    if (studentRollEntry.cgpa !== parseFloat(cgpa)) {
      errors.push(
        `CGPA does not match: expected "${studentRollEntry.cgpa}", received "${cgpa}".`
      );
    }

    // Step 4: If any errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // Step 5: Check if already placed or opted for LOR
    if (lor === "YES" || alreadyPlaced === "YES") {
      return res.status(400).json({
        error:
          "You are not eligible for placement registration due to LOR or prior placement.",
      });
    }

    // Step 6: Make sure the user has agreed to all terms
    if (!allAgree) {
      return res.status(400).json({
        error: "You must agree to all the placement terms to register.",
      });
    }

    const student = await Student.findOne({
      where: { RollNo },
    });

    if (student) {
      return res.status(400).json({
        error: `Roll number ${RollNo} already registered`,
      });
    }

    // Step 7: Insert student data into the database
    // Assuming you have a Students table where you insert this registration info
    // You can use a model for this, e.g., Students.create()

    // Example:

    await Student.create({
      RollNo,
      allAgree,
      alreadyPlaced,
      branch,
      cgpa,
      email,
      gender,
      lor,
      name,
      phoneNo,
      wantToRegister,
    });

    // Step 8: Send success response
    return res
      .status(200)
      .json({ message: "Student registered successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while registering the student." });
  }
};
