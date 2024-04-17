const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Index Page
  router.get('/', controller.Index)

// Display Table
  router.get('/displayemployee', controller.Display)
    
// Create Table
  router.post('/submit', controller.Create);

      
// Edit a Employee Table
  // Load Data in the Form
    router.post('/employees',controller.Details)
  // Update the Value
    router.put('/updateEmployee',controller.Update);


module.exports = router;