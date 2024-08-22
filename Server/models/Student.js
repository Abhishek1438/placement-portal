// server/models/student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust path to your sequelize instance

const Student = sequelize.define(
  "Student",
  {
    RollNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^S(?:20[2-4][1-9]|204[0-0])00[1-3]0[0-9]{3}$/,
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
        is: /^[a-zA-Z]+\.[a-zA-Z]{1}[2-4][0-9]@(?:iiits\.in|IIITS\.IN)$/,
      },
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
    lorOpt: {
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
    eligibilityQuestions: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
