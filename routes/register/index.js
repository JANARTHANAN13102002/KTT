const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Create Table
  router.post('/create', controller.Create);

// Check Login
    router.post('/login',controller.Login)

// Logout
    router.get('/update', controller.Logout)

module.exports = router;