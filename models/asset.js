var  Sequelize  = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Asset = sequelize.define("Asset", {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    serialNumber: Sequelize.INTEGER,
    assetName: Sequelize.STRING,
    brandName: Sequelize.STRING,
    model: Sequelize.STRING,
    assetCost: Sequelize.NUMERIC(10,2),
    status: Sequelize.INTEGER // 0 - Issue and Scrap Button, 1 - Return Button
    },
    {
      classMethods: {
          associate: function(models) {
            Asset.belongsTo(models.AssetCategory);
            Asset.hasMany(models.AssetHistory);
          }
        }
    });
  return Asset;
};