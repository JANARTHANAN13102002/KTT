// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgre',
//   host: 'localhost',
//   database: 'postgre',
//   password: 'janarthanan'
// });

let flag=0;

fetching('/assetfetch')
async function fetching(url) { 
    try { 
        var res = await fetch(url); 
        var data = await res.json(); 
        console.log(data); 
        if(data.message){ 
            alert(data.message); 
            sessionStorage.removeItem('token'); 
            window.location="/" 
        } 
        table = new DataTable('#asset_master', {          
            data: data, 
            fixedColumns: false,       
            fixedHeader: false, 
            searching: true,
            buttons: [
                {
                    extend: 'copy',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'Copy'
                },{
                    extend: 'excel',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'Excel',
                    title: 'Asset'
                }, {
                    extend: 'pdf',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'PDF',
                    title: 'Asset'
                }
            ],
            layout: { 
                top: 'buttons' 
            },             
            scrollY:'50vh', 
            scrollCollapse:true, 
            columnDefs: [ 
                { 'className': "dt-head-center", 'targets':'_all' }, 
                {"className": "text-center", "targets":[]} 
              ], 
              
            columns: [ 
                { 
                    data: 'id', 
                    "bSortable": false, 
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'serialNumber', 
                     "mData": null, 
                    "bSortable": false, 
                    "sClass": "alignCenter"
                    
                }, 
                { 
                    data: 'assetName', "mData": null, 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: 'brandName', "mData": null, 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: 'model',  
                    "mData": null, 
                    "bSortable": false, 
                     
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'assetCost',  
                    "mData": null, 
                    "bSortable": false, 
                     
                    "sClass": "alignCenter" 
                },
                { 
                    data: null, 
                    "bSortable": false, 
                    // "Width":"3%", 
                    "render": function (data) { 
                        return `<div class="mx-auto"><a class="btn btn-warning btn-sm btn-size" data-id =  ${data.id}   onclick="editemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#editmodalId">Edit</a></div>  
                        <div class="mx-auto"><a class="btn btn-danger btn-sm btn-size " data-id =  ${data.id}   onclick="scarpemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#scarpmodalId">Scarp</a></div>
                        <div class="mx-auto"><a id="button1" class="btn btn-info btn-sm btn-size " data-id =  ${data.id}   onclick="issueemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#issuemodalId">Issue</a></div>
                        <div class="mx-auto"><a id="button2" class="btn btn-primary btn-sm btn-size hidden" data-id =  ${data.id}   onclick="returnemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#returnmodalId">Return</a></div>`;
                        
                    } 
                } 
            ], 
            autoWidth:true, 
        }); 
        button();
    } 
    catch (e) { 
        console.log(e); 
    } 
}

async function button() {

    var con = await fetch('/assetfetch');

    const data = await con.json();
    console.log(data.id);

}


// To Toggle the Issue and Return Button
// function fun() {
//     const button1 = document.getElementById('button1');
//     const button2 = document.getElementById('button2');
//     const buttonState = localStorage.getItem('buttonState');
//     if (buttonState === 'button2') {
//         button1.classList.add('hidden');
//         button2.classList.remove('hidden');
//     } else {
//         button2.classList.add('hidden');
//         button1.classList.remove('hidden');
//     }
//     button1.addEventListener('click', () => {
//         button1.classList.add('hidden');
//         button2.classList.remove('hidden');
//         localStorage.setItem('buttonState', 'button2');
//     });
//     button2.addEventListener('click', () => {
//         button2.classList.add('hidden');
//         button1.classList.remove('hidden');
//         localStorage.setItem('buttonState', 'button1');
//     });
// }
// document.addEventListener('DOMContentLoaded', fun);







// Edit Asset Details
async function editemployee(id) {
    try {
        var con = await fetch('/editasset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();
        var num = data.serialNumber;
        document.getElementById("snumber").value = num;
        document.getElementById('aname2').value = data.assetName;
        document.getElementById('bname').value = data.brandName;
        document.getElementById('mname').value = data.model;
        document.getElementById('acost').value = data.assetCost;

        
        const form = document.getElementById('AssetForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const snumber = document.getElementById('snumber').value;
            const aname = document.getElementById('aname2').value;
            const bname = document.getElementById('bname').value;
            const mname = document.getElementById('mname').value;
            const acost = document.getElementById('acost').value;
            

            var con =  fetch('/updateAsset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}`, "snumber" : `${snumber}`, "aname" : `${aname}`, "bname" : `${bname}`, "mname" : `${mname}`
                , "acost" : `${acost}`})
            });

            window.location.reload();
        });
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}


// Delete Asset Details
async function scarpemployee(id) {
    try {
        var con = await fetch('/editasset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();
        document.getElementById('scarpassetname').value = data.assetName;
        const form = document.getElementById('AssetScarpForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const scarpname = document.getElementById('scarpname').value;
            const scarpassetname = data.assetName;
            const pdate = document.getElementById('pdate').value;
            const sdate = document.getElementById('sdate').value;
            const reason = document.getElementById('reason').value;
            

            var con =  fetch('/updatescarp', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({"scarpname" : `${scarpname}` , "scarpassetname" : `${scarpassetname}` , "pdate" : `${pdate}` ,"sdate" : `${sdate}` ,"reason" : `${reason}`})
            });

            var con =  fetch('/deleteEmployee', {
                method: "DELETE",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });
            window.location.reload();
        });

    } catch (error) {
        console.error('Error editing employee:', error);
    }
}


// Issue Asset Details
async function issueemployee(id) {
    try {
        var con = await fetch('/editasset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();

        console.log(data);
        var assetName = data.assetName;

        const form = document.getElementById('issueassetForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            // const issueid = document.getElementById('issueid').value;
            const issuename = document.getElementById('issuename').value;
            const idate = document.getElementById('idate').value;

            var con =  fetch('/EditAssetHistory', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "issuename" : `${issuename}`, "assetName" : `${assetName}`, "idate" : `${idate}` , "id" : `${id}` })
            });
            window.location.reload();
        });
       
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}


// Return Asset Details
async function returnemployee(id) {
    try {
        var con = await fetch('/edithistory', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();

        
        // document.getElementById("rissueid").value = data.employeeId;
        document.getElementById("rissuename").value = data.employeeName;
        document.getElementById("returnissuedate").value = moment(data.issueDate).format('DD-MM-YYYY');

            const form = document.getElementById('returnassetForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const rdate = document.getElementById('returndate').value;
                const notes = document.getElementById('notes').value;
                
                var con =  fetch('/updateAssetreturn', {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${data.id}`, "rdate" : `${rdate}`, "notes" : `${notes}`})
                });

                window.location.reload();
            });     
            
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}

// async function getIdFromEmployeeId(employeeId) {
//     try {
//       const query = {
//         text: 'SELECT id FROM assethistories WHERE employeeId = $1',
//         values: [employeeId],
//       };
  
//       const result = await pool.query(query);
//       return result.rows[0].id;
//     } catch (error) {
//       console.error('Error fetching ID from employeeId:', error);
//       throw error;
//     }
//   }