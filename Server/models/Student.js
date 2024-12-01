// server/models/student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path to your sequelize instance

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RollNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^S(?:20[1-4][1-9]|204[0-0])00[1-3]0[0-9]{3}$/,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        is: /^[a-zA-Z]+\.[a-zA-Z]{1}[1-9][0-9]@(?:iiits\.in|IIITS\.IN)$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[6789]\d{9}$/,
      },
    },
    cgpa: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wantToRegister: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alreadyPlaced: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allAgree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
