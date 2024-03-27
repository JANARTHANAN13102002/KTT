const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const {Employee,Asset,Category} = require('./models/index');
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
  app.get('/category', (req, res) => {
      res.sendFile(path.join(__dirname,'category.html'));
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
    //Creating Employees table
        app.get('/submit', async (req, res) => {
            try {
              const user = await Employee.create({
                name: req.query.name,
                email: req.query.email,
                age : req.query.age,
                mobile: req.query.mnumber,
                address : req.query.address,
                role :  req.query.role,
                bloodGroup : req.query.bgroup,
                salary : req.query.salary,
                status : req.query.status,
              });
              res.redirect(req.get('referer'));
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
        });

  //Creating Asset table
      app.get('/assets', async (req, res) => {
        try {
          const user = await Asset.create({
            serialNumber : req.query.snumber,
            assetName : req.query.aname,
            brandName : req.query.bname,
            model: req.query.mname,
            assetCost : req.query.acost,
            employeeId : req.query.eid,
            AssetCategoryId : req.query.aid
          });
          res.redirect(req.get('referer'));
        } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).send('Internal Server Error');
        }
      });

  //Creating Asset Category table
      app.get('/categorys', async (req, res) => {
        try {
          const user = await Category.create({
            categoryName : req.query.cname
          });
          console.log(user);
          res.redirect(req.get('referer'));
        } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).send('Internal Server Error');
        }
      });



// Displaying the Table
    // Displaying the Employees Table
      app.get('/employee', async (req, res) => {
        try {
          const user = await Employee.findAll();
          res.send(user);
        } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).send('Internal Server Error');
        }
      });

    // Displaying the Assets Table
        app.get('/assetfetch', async (req, res) => {
          try {
            const user = await Asset.findAll();
            res.send(user);
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });

    // Displaying the Asset Categorys Table
        app.get('/categoryfetch', async (req, res) => {
          try {
            const user = await Category .findAll();
            res.send(user);
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });


// Updating the DataBase Values
    // Employees table
        app.post('/employees', async (req, res) => {
          const {id} = req.body;
          const resultemployee = await Employee.findOne({where:{id : id}});
          res.send(resultemployee);
        });

        app.post('/updateEmployee', async (req, res) => {
          try {
            const employeeId = req.body.id;
            const user = await Employee.update({
              name: req.body.name,
              email: req.body.email,
              age : req.body.age,
              mobile: req.body.mobile,
              address : req.body.address,
              role :  req.body.role,
              bloodGroup : req.body.bgroup,
              salary : req.body.salary,
              status : req.body.status,
            },
            {
              where: { id: employeeId }
            });
            
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });


    // Assets table
        app.post('/editasset', async (req, res) => {
          const {id} = req.body;
          const result = await Asset.findOne({where:{id : id}});
          res.send(result);
        });

        app.post('/updateAsset', async (req, res) => {
          try {
            const employeeId = req.body.id;
            const user = await Asset.update({
              serialNumber: req.body.snumber,
              assetName: req.body.aname,
              brandName : req.body.bname,
              model: req.body.mname,
              assetCost : req.body.acost,
              employeeId :  req.body.eid,
              AssetCategoryId : req.body.aid,
            },
            {
              where: { id: employeeId }
            });
            
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });



    // Asset Category table
          app.post('/assetcategory', async (req, res) => {
            const {id} = req.body;
            const results = await Category.findOne({where:{id : id}});
            res.send(results);
          });

          app.post('/updateAssetCategory', async (req, res) => {
            try {
              const employeeId = req.body.id;
              const user = await Category.update({
                categoryName: req.body.cname
              },
              {
                where: { id: employeeId }
              });
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
          });




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




