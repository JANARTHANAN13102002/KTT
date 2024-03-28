const Employee = require('./employee.js');
const Asset = require('./asset.js');
const Category = require('./category.js');
const AssetHistory = require('./assethistory.js');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(module.filename);
const sequelize = require('../config/db.js');

Employee.hasMany(Asset);
Category.hasMany(Asset);

Asset.hasMany(AssetHistory);
Employee.hasMany(AssetHistory);

sequelize.sync()
    .then(() => {
        console.log("Database Synchronization Successful");
        Object.keys(sequelize.models).forEach(modelName => {
            console.log(`Table Created: ${modelName}`);
        });
    })
    .catch(error => {
        console.log('Error in Synchronizing database:', error);
    });

module.exports = {Employee, Asset, Category,AssetHistory};
