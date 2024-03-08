const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhi1438",
  database: "placement_portal",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = connection;
