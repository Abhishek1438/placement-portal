const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/emailService");

// Student Login
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    if (!student)
      return res.status(401).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student.id, role: "student" },
      "your_secret_key",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send Reset Password Email
exports.resetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    if (!student) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign(
      { id: student.id, role: "student" },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Reset Password",
      `Reset your password using this link: ${resetLink}`
    );

    res.status(200).json({ message: "Reset password link sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.update(
      { password: hashedPassword },
      { where: { id: decoded.id } }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
