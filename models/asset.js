const { DataTypes, NUMBER } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("asset", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serialNumber: {
      type: DataTypes.INTEGER,
    },
    assetName  : {
        type : DataTypes.STRING
    },
    brandName : {
      type: DataTypes.STRING
    },
    model : {
      type: DataTypes.STRING
    },
    assetCost : {
        type: DataTypes.BIGINT
    },
    status : {
        type: DataTypes.INTEGER
    }
  });



module.exports = User;
