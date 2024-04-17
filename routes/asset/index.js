const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Index Page
    router.get('/', controller.Index);

// Displaying the Assets Table
    router.get('/assetfetch', controller.Display)

// Create Row of Asset Table 
    router.post('/createasset', controller.Create)

// To the toggle Button
    router.post('/fetching/asset', controller.Toggle)

// Edit Button
    // Load Data in the Form
        router.post('/editasset',controller.Details)
    // Update the Value
        router.put('/updateAsset',controller.Update)


// Scrap Button 
    router.post('/updatescarp',controller.Scrap)

// Delete Asset Details
    router.delete('/deleteEmployee',controller.Delete);


// Issue Button
    // Loading Employee Name in the Form
        router.get('/fetching/asset/employee' , controller.FetchEmployeeName)
    //Fetch Employee Name from Employee Id
        router.get('/fetching/assetName' , controller.AssetName)
    // Creating new Row for the Issue Button
        router.post('/EditAssetHistory',controller.IssueCreate)
    // Update the Status in the asset Table
        router.put('/status/update' , controller.UpdateStatus)
    // Update the AssetId in the asset Table  --> Not Used
        router.post('/fetching/AssetCategory' , controller.FetchingAssetCategory)


// Return Button
    // Update a Row for return Button
        router.put('/updateAssetreturn' , controller.UpdateReturn);
    // To find the Last Element to be Updated
        router.post('/edithistory',controller.SearchHistory)

module.exports = router;