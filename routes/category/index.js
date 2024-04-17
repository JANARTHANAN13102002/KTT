const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Index Page
    router.get('/', controller.Index);

// Displaying the Asset Categorys Table
    router.get('/categoryfetch', controller.Display)

// Create Table
    router.post('/createcategory' , controller.Create);

// Edit a Employee Table
    // Load Data in the Form
        router.post('/assetcategory' , controller.Details);
    // Update the Value
        router.put('/updateAssetCategory' , controller.Update);


module.exports = router;