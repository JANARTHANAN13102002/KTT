const { DataTypes, NUMBER  } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("assethistory", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeName: {
      type: DataTypes.STRING
    },
    assetName: {
      type: DataTypes.STRING
    },
    issueDate: {
      type: DataTypes.DATE
    },
    returnDate: {
      type: DataTypes.DATE
    },
    scrapDate: {
      type: DataTypes.DATE
    },
    notes: {
      type: DataTypes.STRING
    },
  });

module.exports = User;