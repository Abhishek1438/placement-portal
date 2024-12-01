const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    console.log(user);
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };
