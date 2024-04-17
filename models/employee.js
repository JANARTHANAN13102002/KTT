// Short Int -- 32 bit
// Big int -- 64 bit
var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes)  {
    const Employee = sequelize.define("Employee", {
        id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        },
        name: Sequelize.STRING ,
        email : Sequelize.STRING ,
        age:  Sequelize.INTEGER,
        mobile: Sequelize.STRING,
        address: Sequelize.TEXT,
        role: Sequelize.STRING ,
        bloodGroup : Sequelize.STRING,
        salary  : Sequelize.NUMERIC(15,2),
        status   : Sequelize.INTEGER // 1 - Active , 0 - Inactive 
    },
    {
        classMethods: {
            associate: function(models) {
                Employee.hasMany(models.AssetHistory)
            }
        }
    });

    return Employee;
}
