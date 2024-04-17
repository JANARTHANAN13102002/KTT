const Employee = require('../../models').Employee;

// Index Page
  exports.Index = async function(req,res) {
    res.render('addemp');
  }

// Display Page
  exports.Display = async function(req,res) {
    const user = await Employee.findAll();
    
    if(!user)
      return res.send({success : false, error : "Table Not Found"})
    
    return res.send({success : true, result : user});
  }

// Create Table 
  exports.Create = async function (req, res) {
              if(req.body.age < 18) {
                return res.send({ success: false, error: "Age is not valid. Please try again" });
              } else if(req.body.salary < 0) {
                  return res.send({ success: false, error: "Salary cannot be negative. Please try again" });
              } else { 
                  const user =  Employee
                      .create({
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
                      return res.send({ success: true, result : user });
                }
    }

// Edit Form 
  // Load Data in the Form
  exports.Update = async function (req, res) {
    if(req.body.age < 18) {
      return res.send({ success: false, error: "Age is not valid. Please try again" });
    } else if(req.body.salary < 0) {
        return res.send({ success: false, error: "Salary cannot be negative. Please try again" });
    } else { 
      const user =  Employee
        .update({
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
              where: { id: req.body.id }
            })
          return res.send({ success: true, result : user });
        }
  }
  // Load Data in the Form
  exports.Details = async function (req, res) {
        const resultemployee = await Employee.findOne({where:{id : req.body.id}});
        if(!resultemployee)
          return res.send({success : true, error : 'Employee not Found'});

        return res.send({success:true, result : resultemployee});
    }
