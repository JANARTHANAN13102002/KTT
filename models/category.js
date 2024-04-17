var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes)  {
    const AssetCategory = sequelize.define("AssetCategory", {
        id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
        },
        name : Sequelize.STRING
    },{
        classMethods: {
            associate: function(models) {
                AssetCategory.hasMany(models.Asset)
            }
        }
    });
    return AssetCategory;
}