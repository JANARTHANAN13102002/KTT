const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(module.filename);
const config = require("./../config/db.json");
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};


// Read model files and associate them with Sequelize
  fs.readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file))
      db[model.name] = model;
    });


// Apply associations
  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

// Test the database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });


  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

// If we run the Code, the Table will be created with Foreign Keys
  sequelize.sync();

// Export db object
  module.exports = db;
