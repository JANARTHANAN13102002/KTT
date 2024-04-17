// Short Int -- 32 bit
// Big int -- 64 bit
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes)  {
    const Login = sequelize.define("Login", {
        id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        },
        name: Sequelize.STRING ,
        email : Sequelize.STRING ,
        password : Sequelize.STRING,
        confirmPassword : Sequelize.STRING
    });

    return Login;
}
