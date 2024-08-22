const sequelize = require("../config/database");
const RollLists = require("./RollList");

const db = {
  sequelize,
  RollLists,
};

module.exports = db;
