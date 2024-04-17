var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes)  {
    const AssetHistory = sequelize.define("AssetHistory", {
        id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
        },
        assetName: Sequelize.STRING,
        issueDate: Sequelize.DATEONLY,
        returnDate: Sequelize.DATEONLY,
        scrapDate: Sequelize.DATEONLY,
        notes: Sequelize.STRING
    },{
        classMethods: {
            associate: function(models) {
                AssetHistory.belongsTo(models.Asset);              
                AssetHistory.belongsTo(models.Employee);              
            }
        }
    });
    return AssetHistory;
}


//  /*
//   Issue Date
//     id - primary Key,
//     EmployeeName -- who is scrap the Particular Asset
//     AssetName -- which Asset we are Scrap
//     issueDate -- 04/03/2024 (issue on which date)
//     returnDate -- Null 
//     scrapDate -- Null
//   */ 
//   /*
//   Return Date
//     id - primary Key,
//     EmployeeName -- who is scrap the Particular Asset
//     AssetName -- which Asset we are Scrap
//     issueDate -- 04/03/2024 (issue on which date)
//     returnDate -- 01/04/2024 (return on which date)
//     scrapDate -- Null
//   */ 
//   /*
//   Scrap Date
//     id - primary Key,
//     EmployeeName -- who is scrap the Particular Asset
//     AssetName -- which Asset we are Scrap
//     issueDate -- 04/03/2024 (Purchase on which date)
//     returnDate -- Null 
//     scrapDate -- 01/04/2024 (Scrap on which date)
//   */ 
        