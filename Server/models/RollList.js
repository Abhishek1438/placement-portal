// models/RollList.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RollList = sequelize.define(
  "RollList",
  {
    rollNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cgpa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    error: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "roll_list",
    timestamps: false,
  }
);

module.exports = RollList;
