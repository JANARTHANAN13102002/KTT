const express = require('express');
const router = express.Router();
const path = require('path') ;
const controller = require('./controller');

// Index Page
    router.get('/', controller.Index)

// Chart For the Employee Table
    router.get('/chart/employee', controller.DisplayEmployee)
  
// Chart For the Asset Table
    router.get('/chart/asset', controller.DisplayAsset)
  
// Chart For the AssetHistory Table
    router.get('/chart/AssetHistory', controller.DisplayAssetHistory)
  
module.exports = router;