const AssetCategory = require('../../models').AssetCategory;

// Index Page
exports.Index = async function(req,res){
    res.render('category');
}

// Display Table
exports.Display = async function(req,res){
    const user = await AssetCategory.findAll();
    if(!user) 
        return res.send({success : false , error : "Table Not Found"})  
    return res.send({success : true , result : user});
}


// Create Table
exports.Create = async function (req, res) {

    const createCategory =  AssetCategory.create({ name: req.body.name });
    if(!createCategory)
      return res.send({succuss:false, error : "Invaild Input"});

    return res.send({success:true, result : createCategory});
}

// Edit a Employee Table
    // Update the Value
        exports.Update = async function (req,res){
            const updateAssetCategory = AssetCategory
            .update({
                name: req.body.cname
            },
            {
                where: { id: req.body.id  }
            })

            if(!updateAssetCategory) 
            return res.send({success:false, error : "AssetCategory Not Found"});

            return res.send({success:true, result : updateAssetCategory});
        }

    // Load Data in the Form
        exports.Details = async function(req,res) {
            const detailsAssetCategory =await AssetCategory.findOne({where: { id: req.body.id }});

            if(!detailsAssetCategory)
                return res.send({success:false, error : "AssetCategory Not Found"});

            return res.send({success:true, result : detailsAssetCategory})
        }