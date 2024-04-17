const express = require('express');
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const employeeRouter = require('./routes/employee/index.js')
const categoryRouter = require('./routes/category/index.js')
const AssetRouter = require('./routes/asset/index.js')
const AssetHistoryRouter = require('./routes/assethistory/index.js')
const DashBoardRouter = require('./routes/dashboard/index.js')
const RegisterRouter = require('./routes/register/index.js')

const app = express();
const port = 5100;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

// serve Redirecting
  app.use('/employee', employeeRouter);
  app.use('/category', categoryRouter);
  app.use('/asset', AssetRouter);
  app.use('/assethistory', AssetHistoryRouter);
  app.use('/dashboard', DashBoardRouter);
  app.use('/register', RegisterRouter);


// Creating the Router(API)
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/register', (req, res) => {
      res.render('register');
  });
  // app.get('/password', (req, res) => {
  //   res.render('password');
  // });
  function loginurl(req, res, next) {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, 'mySecretKey', (err, payload) => {
            if (err) {
                res.redirect('/');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/');
    }
}

// Using loginurl middleware
app.use(loginurl);
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});