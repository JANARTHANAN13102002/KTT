const AssetHistory = require('../../models').AssetHistory;

// Index Page
    exports.Index = async function(req,res) {
        res.render('assethistory');
    }

// Displaying the Asset History Table
    exports.Display = async function(req,res){
        const AssetHistoryTable = await AssetHistory.findAll();
        if(!AssetHistoryTable)
            return res.send({success : false , error : "Table Not Found"});
        return res.send({success : true , result : AssetHistoryTable})
    }

// Edit Button
    // To find the row Values of the Asset History
    exports.Details = async function(req,res) {
        const results = await AssetHistory.findOne({ where: { id: req.body.id }});

        if(!results)
            return res.send({success:false, error : "AssetHistory Not Found"});
    
        return res.send({success:true , result : results});
    }

    // Updating the Asset History Table (Without Return Date)
    exports.UpdateHistoryScrap = async function(req,res) {
        if(!req.body.rdate){
            if(req.body.status > req.body.CurrDate){
                return res.send ({success : fasle ,error : "The scrap Date is Greater Than the Current Date"}) 
            } else {
                const UpdateAssetHistory = await AssetHistory.update({
                    assetName : req.body.assetName,
                    issueDate : req.body.idate,
                    scrapDate : req.body.status,
                    notes : req.body.notes,
                },
                {
                    where : {id : req.body.id}
                });
        
                if(!UpdateAssetHistory)
                    return res.send({success:false, error : "Asset History Not Found"});
                return res.send({success:true, result:UpdateAssetHistory});

            }
        }
        if(!req.body.status){       
            if(req.body.rdate > req.body.CurrDate){     
                return res.send ({success : false ,error : "The return Date is Greater Than the Current Date"})    
            } else {
                const UpdateAssetHistory = await AssetHistory.update({
                    assetName : req.body.assetName,
                    issueDate : req.body.idate,
                    returnDate : req.body.rdate,
                    notes : req.body.notes,
                },
                {
                    where : {id : req.body.id}
                });
        
                if(!UpdateAssetHistory)
                    return res.send({success:false, error : "Asset History Not Found"});
                return res.send({success:true, result:UpdateAssetHistory});
            }
        }  
    }



// Delete Button
    exports.Delete = async function(req,res){
        const result = await AssetHistory.destroy({where:{id : req.body.id}});

        if(!result)
            return res.send({success : false, error : "Asset History Not Found"});
        return res.send({success:true, result:result});
    }