const express = require('express');
const bodyParser = require('body-parser');
const {Employee,Asset} = require('./models/index');
const path = require('path');

const app = express();
const port = 5100;

app.use(bodyParser.json());
app.use(express.static('public'));


// Creating the Router(API)
  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname,'index.html'));
  });
  app.get('/addemp', (req, res) => {
      res.sendFile(path.join(__dirname,'addemp.html'));
  });
  app.get('/asset', (req, res) => {
      res.sendFile(path.join(__dirname,'asset.html'));
  });
  app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname,'login.html'));
  });
  app.get('/register', (req, res) => {
      res.sendFile(path.join(__dirname,'register.html'));
  });
  app.get('/password', (req, res) => {
      res.sendFile(path.join(__dirname,'password.html'));
  });



// Adding Values Into Employee DataBase
app.get('/submit', async (req, res) => {
    try {
      // Create a user based on form data
      const user = await Employee.create({
        name: req.query.name,
        email: req.query.email,
        age : req.query.age,
        mobile: req.query.mnumber,
        address : req.query.address,
        role :  req.query.role,
        joiningDate : req.query.jdate,
        bloodGroup : req.query.bgroup,
        salary : req.query.salary,
        status : req.query.status,
      });
      res.sendFile(path.join(__dirname,'addemp.html'));
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
});

// Adding Values Into Asset DataBase
app.get('/assets', async (req, res) => {
  try {
    // Create a user based on form data
    const user = await Asset.create({
      serialNumber : req.query.snumber,
      assetName : req.query.aname,
      brandName : req.query.bname,
      model: req.query.mname,
      assetCost : req.query.acost,
      purchaseDate : req.query.pdate,
      employeeId : req.query.eid
    });
    res.sendFile(path.join(__dirname,'asset.html'));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
