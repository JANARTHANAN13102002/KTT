const { DataTypes, NUMBER } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("AssetCategories", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    categoryName : {
      type: DataTypes.STRING
    },
  });


module.exports = User;
