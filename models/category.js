const { DataTypes, NUMBER } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("assetcategory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING
    },
  });


module.exports = User;
