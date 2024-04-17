const Login = require('../../models').Login;
const jwt = require('jsonwebtoken');

// Create Table 
  exports.Create = async function (req, res) {
        const user =  Login
            .create({
              name: req.body.name,
              email: req.body.email,
              password : req.body.inputPassword,
              confirmPassword: req.body.inputPasswordConfirm,
            });
        return res.send({ success: true, result : user });
    }

// Check Login
    exports.Login = async function(req,res) {
      const user = await Login.findOne({
        where: {
          email: req.body.email,
        }
      });

      if(!user) {
          return res.send({success: false, error: 'Invalid Email_Id'});
      }

      if(user.password != req.body.password) {
          return res.send({success: false, error: 'Invalid Password'});
      }

      const payload = { email: user.email };
      const secretKey = 'mySecretKey';
      const token = jwt.sign(payload, secretKey);
      
      // res.cookie('jwt', token, { httpOnly: true });
      res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
      });

      return res.send({success: true, message: 'Login Successfull' });
    }


// Logout
    exports.Logout = async function(req,res) {
      res.clearCookie('access_token');
    }
    

