// const Employee = require('../../models').Employee;
const { log } = require('console');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    database: 'WebApp',
    password: 'janarthanan',
  });

// Index Page
    exports.Index = async function(req, res) {
        res.render('dashboard');
    };


// Chart For the Employee Table
    exports.DisplayEmployee = async function(req,res){
        const client = await pool.connect();
        const result = await client.query('SELECT status, COUNT(*) AS count FROM "Employees" GROUP BY status');
        client.release();
        const status = result.rows.map(row => row.status);
        const counts = result.rows.map(row => parseInt(row.count)); 
        res.json({ labels: status, counts: counts });
    }



// Chart For the Asset Table
    exports.DisplayAsset = async function(req,res){
              const client = await pool.connect();
              const result = await client.query('SELECT "assetName", COUNT(*) AS count FROM "Assets" GROUP BY "assetName"');
              client.release();
              const assetNames = result.rows.map(row => row.assetName); 
              const counts = result.rows.map(row => parseInt(row.count)); 
              res.json({ labels: assetNames, counts: counts }); 
    }


// Chart For the AssetHistory Table
    exports.DisplayAssetHistory = async function(req,res){
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM "AssetHistories" WHERE "scrapDate" IS NOT NULL');
            client.release();
            const assetNames = result.rows; 
            res.json({ labels: assetNames}); 
    }