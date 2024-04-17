const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Index page
    router.get('/', controller.Index);

// Displaying the Asset History Table
    router.get('/assethistoryfetch', controller.Display)

// Edit Button 
    // To find the row Values of the Asset History
        router.post('/editHistoryName', controller.Details)
    // Updating the Asset History Table (without Return Date)
        router.put('/updateassethistoryScrap', controller.UpdateHistoryScrap)
    // Updating the Asset History Table (without Scrap Date)
        // router.put('/updateassethistoryReturn', controller.UpdateHistoryReturn)

// Delete Button
    router.delete('/deleteassetHistory', controller.Delete);

    
module.exports = router;