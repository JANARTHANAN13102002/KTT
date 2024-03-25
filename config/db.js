// config/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'janarthanan', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
