const { DataTypes, NUMBER  } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    mobile: {
      type: DataTypes.BIGINT
    },
    address: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.TEXT
    },
    bloodGroup : {
        type: DataTypes.STRING
    },
    salary  : {
        type: DataTypes.INTEGER
    },
    status   : {
        type: DataTypes.TEXT
    },
  });

module.exports = User;