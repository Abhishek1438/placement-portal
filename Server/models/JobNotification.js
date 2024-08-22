const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const JobNotification = sequelize.define(
  "JobNotification",
  {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobDesignation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfEmployment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eligibilityCriteria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applicableBranch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stipend: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ctc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otherBenefits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bond: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    aboutCompany: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    selectionProcess: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactDesignation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactMobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "job_notifications",
    timestamps: true,
  }
);

module.exports = JobNotification;
