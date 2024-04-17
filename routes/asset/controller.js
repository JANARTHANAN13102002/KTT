const Asset = require('../../models').Asset
const AssetHistory = require('../../models').AssetHistory
const Employee = require('../../models').Employee
const AssetCategory = require('../../models').AssetCategory

//Index Page
exports.Index = async function(req,res) {
    res.render('asset');
}

// Displaying the Assets Table
exports.Display = async function(req,res){
    const user = await Asset.findAll();
    if(!user) 
        return res.send({success:false, error : "Table Not Found"});
    return res.send({success:true , result : user});
}


// Create Button
exports.Create = async function(req,res) {
    if(req.body.acost < 0) 
        {
            return res.send({success : false, error : "Asset Cost is in Negative Value. Please try again"});
        } else {
            const createAsset = Asset
                .create({
                    serialNumber : req.body.snumber,
                    assetName : req.body.aname1,
                    brandName : req.body.bname,
                    model: req.body.mname,
                    assetCost : req.body.acost,
                    status : 0,
                })
                return res.send({success : true, result :createAsset});
        }
}

//Toggle the Issue and Return 
exports.Toggle = async function(req,res){
    const user = await Asset.findAll();
    return res.send(user);
}


// Update Button

    // Load Data in the Form
        exports.Details = async function(req,res){
            const result = await Asset.findOne({where:{id : req.body.id}});
            if(!result) 
                return res.send({success:false , error : "Asset Not Found"});
            return res.send({success : true , result : result});
        }

    // Update the Value
        exports.Update = async function(req,res){
            if(req.body.acost < 0) 
            {
                return res.send({success : false, error : "Asset Cost is in Negative Value. Please try again"});
            } else {
            const updateAsset = Asset
                .update({
                    serialNumber: req.body.snumber,
                    assetName : req.body.aname,
                    brandName : req.body.bname,
                    model: req.body.mname,
                    assetCost : req.body.acost,
                    },
                    {
                    where: { id: req.body.id }
                })
                return res.send({success : true , result : updateAsset})
            }
        }

// Scrap Button
    exports.Scrap = async function(req,res){
        if(req.body.CurrDate < req.body.sdate){
            return res.send({success : false, error : "Scrap Date is Greater than Current Date"});
        } 
        else if(req.body.sdate < req.body.pdate){
            return res.send({ success : false, error : "Scrap Date is Smaller than Purchase Date"});
        } else{
            const ScrapAsset = AssetHistory.create({
                EmployeeId : req.body.Employeeid,
                assetName : req.body.scarpassetname,
                issueDate : req.body.pdate,
                scrapDate : req.body.sdate,
                notes : req.body.reason,
            });
            return res.send({success : true , result : ScrapAsset})
        }   
    }

//  Delete Asset Details
    exports.Delete = async function(req,res){
        const result = await Asset.destroy({where:{id : req.body.id}});
        return res.send({success : true, result :"result"});
    }

// Issue Button
    // Creating new Row for the Issue Button
    exports.IssueCreate = async function(req,res) {
        if(req.body.CurrDate < req.body.idate) {
            return res.send({success : false, error : "Issue Date is Greater than Current Date"});
        } else {
            const createAsset = AssetHistory
                .create({
                    assetName : req.body.assetName,
                    issueDate : req.body.idate,
                    AssetId : req.body.id,
                    EmployeeId : req.body.issueid,
                    notes : req.body.notes,
            });
            return res.send({success : true, result : createAsset});
        }
    }
    
    // Update the AssetCategoryId in the asset Table   --> Not Used 
    exports.FetchingAssetCategory = async function(req,res) {
        return AssetCategory.findOne({ where: { name: req.body.assetName } });
    }

    // Update the Status in the asset Table
    exports.UpdateStatus = async function(req,res) {
        const UpdateStautsAsset = Asset.update({
                status : req.body.status,
            },
            {
                where: { id: req.body.id }
        })

        if(!UpdateStautsAsset)
            return res.send({success:false , error : "Asset Not Found"})

        return res.send({success:true, result: UpdateStautsAsset});
    }

    // Display Employee Name
    exports.FetchEmployeeName = async function(req,res){
        const user = await Employee.findAll();
        if(!user) 
            return res.send({success:false, error : "Table Not Found"});
        return res.send({success:true , result : user});
    }

    // Display the Asset Details
    exports.AssetName = async function(req,res){
        const user = await AssetCategory.findAll();
        if(!user) 
            return res.send({success:false, error : "Table Not Found"});
        return res.send({success:true , result : user});
    }
    
    
//Return Button
    // Update a Row for return Button
    exports.UpdateReturn = async function(req,res){
        if(req.body.issueDate > req.body.rdate) {
            return res.send({success : false , error : "The return Date is Smaller than the Issue Date"});
        } else if(req.body.CurrDate < req.body.rdate){
            return res.send({success : false , error :"The return Date is Greater than the Current Date"});
        }
        else{
            const UpdateReturnValue = AssetHistory
                .update({
                    returnDate: req.body.rdate,
                    notes: req.body.notes, 
                },
                {
                    where: { id: req.body.id }
            });

            if(!UpdateReturnValue)
                return res.send({success:false, error : "Asset Not Found"});
            return res.send({success:true , result : UpdateReturnValue});
        }
    }

    // To find the Last Element to be Updated
    exports.SearchHistory = async function(req,res){
        const results = await AssetHistory.findOne({
            where: { AssetId: req.body.id },
            order: [['returnDate', 'DESC']], 
            limit: 1
            });
        
        if(!results)
            return res.send({success:false, error : "Asset Not Found"});

        return res.send({success:true , result:results});
    }