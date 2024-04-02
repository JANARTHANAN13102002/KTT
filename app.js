const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const {Employee,Asset,Category,AssetHistory} = require('./models/index');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = 5100;

app.use(bodyParser.json());
app.use(express.static('public'));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'janarthanan',
});


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
  app.get('/assethistory', (req, res) => {
      res.sendFile(path.join(__dirname,'assethistory.html'));
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
  app.get('/emp', (req, res) => {
      res.sendFile(path.join(__dirname,'employee.html'));
  });



// Adding Values Into Employee DataBase
    //Creating Employees table
        app.post('/submit', async (req, res) => {
            try {
              const user = await Employee.create({
                name: req.body.name,
                email: req.body.email,
                age : req.body.age,
                mobile: req.body.mnumber,
                address : req.body.address,
                role :  req.body.role,
                bloodGroup : req.body.bgroup,
                salary : req.body.salary,
                status : req.body.status,
              });
              res.send(user);
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
            employeeName : req.query.ename,
            assetName : req.query.aname1,
            brandName : req.query.bname,
            model: req.query.mname,
            assetCost : req.query.acost,
            status : 0,
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
            name : req.query.cname
          });
          console.log(user);
          res.redirect(req.get('referer'));
        } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).send('Internal Server Error');
        }
      });

  //Creating Asset History table
      app.post('/assethistorycreate', async (req, res) => {
        try {
          const user = await AssetHistory.create({
            employeeName : req.body.ename,
            assetName : req.body.aname,
            issueDate : req.body.idate,
            returnDate : req.body.rdate,
            status : req.body.status,
          });
          console.log(user);
          res.send("result");
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
            const user = await Category.findAll();
            res.send(user);
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });

    // Displaying the Asset History Table
      app.get('/assethistoryfetch', async (req, res) => {
        try {
          const user = await AssetHistory.findAll();
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
              salary : req.query.salary,
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

        // Update the asset Table
        app.post('/updateAsset', async (req, res) => {
          try {
            const employeeId = req.body.id;
            const user = await Asset.update({
              serialNumber: req.body.snumber,
              employeeName: req.body.ename,
              assetName: req.body.aname,
              brandName : req.body.bname,
              model: req.body.mname,
              assetCost : req.body.acost,
            },
            {
              where: { id: employeeId }
            });
            
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
          }
        });

        // Update the asset Table
        app.post('/status/update', async (req, res) => {
          try {
            const employeeId = req.body.id;
            const user = await Asset.update({
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

        // To Select tag in asset Table
        app.get('/options', async (req, res) => {
          try {
              const { rows } = await pool.query('SELECT id, name FROM employees');
              res.json(rows);
          } catch (err) {
              console.error('Error executing query', err);
              res.status(500).json({ error: 'Internal Server Error' });
          }
        });

        // To Select tag in asset Table
        app.get('/assetcategoryname', async (req, res) => {
          try {
              const { rows } = await pool.query('SELECT id, name FROM assetcategories');
              res.json(rows);
          } catch (err) {
              console.error('Error executing query', err);
              res.status(500).json({ error: 'Internal Server Error' });
          }
        });

        // To the toggle Button
        app.post('/fetching/asset', async (req, res) => {
          try {
            const user = await Asset.findAll();
            res.send(user);
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
                name: req.body.cname
              },
              {
                where: { id: employeeId }
              });
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
          });

    // Asset History table
        // To find the Last Element to be Updated
          app.post('/edithistory', async (req, res) => {
            const {id} = req.body;
            const results = await AssetHistory.findOne({
              where: { assetId: id },
              order: [['returnDate', 'DESC']], 
              limit: 1
            });
            res.send(results);
          });

        // To find the row of the Asset History
          app.post('/editHistoryName', async (req, res) => {
            const {id} = req.body;
            const results = await AssetHistory.findOne({ where: { id: id }});
            res.send(results);
          });

        // Updating the Asset History Table
          app.post('/updateassethistory', async (req, res) => {
            try {
              const Id = req.body.id;
              const user = await AssetHistory.update({
                  employeeName : req.body.issuename,
                  assetName : req.body.assetName,
                  issueDate : req.body.idate,
                  returnDate : req.body.rdate,
                  notes : req.body.notes,
              },
              {
                where : {id : Id}
              });
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
          });

          // Creating new Row for the Issue Button
          app.post('/EditAssetHistory', async (req, res) => {
            try {
              const user = await AssetHistory.create({
                  employeeName : req.body.issuename,
                  assetName : req.body.assetName,
                  issueDate : req.body.idate,
                  assetId : req.body.id,
                  notes : req.body.notes,
              });
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
          });

        // Update a Row for return Button
          app.post('/updateAssetreturn', async (req, res) => {
            try {
              const Id = req.body.id;
              const updatedAssetHistory = await AssetHistory.update({
                returnDate: req.body.rdate,
                notes: req.body.notes, 
              }, {
                where: { id: Id }
              });
              res.send(updatedAssetHistory);
            } catch (error) {
              console.error('Error updating asset history:', error);
              res.status(500).send('Internal Server Error');
            }
          });

          // Creating new Row for Scarp Button
          app.post('/updatescarp', async (req, res) => {
            try {
              const user = await AssetHistory.create({
                employeeName : req.body.scarpname,
                assetName : req.body.scarpassetname,
                issueDate : req.body.pdate,
                returnDate : req.body.sdate,
                notes : req.body.reason,
              });
              
            } catch (error) {
              console.error('Error creating user:', error);
              res.status(500).send('Internal Server Error');
            }
          });


// Delete Asset Details
      app.delete('/deleteEmployee', async (req, res) => {
        const {id} = req.body;
        const result = await Asset.destroy({where:{id : id}});
        res.send("result");
      });     

// Delete Asset History Details
      app.delete('/deleteassetHistory', async (req, res) => {
        const {id} = req.body;
        const result = await AssetHistory.destroy({where:{id : id}});
        res.send("result");
      });          


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
