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
            buttons: [
                {
                    extend: 'copy',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'Copy'
                },{
                    extend: 'excel',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'Excel',
                    title: 'Employees'
                }, {
                    extend: 'pdf',
                    className: 'btn btn-primary btn-sm btn-size',
                    text: 'PDF',
                    title: 'Employee'
                }
            ],
            layout: { 
                top: 'buttons' 
            },             
            scrollY:'40vh', 
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
                    data: 'employeeName', 
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
                // { 
                //     data: 'AssetCategoryId', "mData": null, 
                //     "bSortable": false, 
                 
                //     // "sClass": "alignCenter" 
                // },
                { 
                    data: null, 
                    "bSortable": false, 
                    // "Width":"3%", 
                    "render": function (data) { 
                        return `<div class="mx-auto"><a class="btn btn-warning btn-sm btn-size" data-id =  ${data.id}   onclick="editemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#editmodalId">Edit</a></div>  <div class="mx-auto"><a class="btn btn-danger btn-sm btn-size " data-id =  ${data.id}   onclick="deleteemployee(this.getAttribute('data-id'))">Delete</a></div>`
                    } 
                } 
            ], 
            autoWidth:true, 
        }); 
    } 
 
    catch (e) { 
        console.log(e); 
    } 
}

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
        document.getElementById('select').value = data.employeeName;
        document.getElementById('aname1').value = data.assetName;
        document.getElementById('bname').value = data.brandName;
        document.getElementById('mname').value = data.model;
        document.getElementById('acost').value = data.assetCost;

        
        const form = document.getElementById('AssetForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const snumber = document.getElementById('snumber').value;
            const ename = document.getElementById('ename').value;
            const aname = document.getElementById('aname2').value;
            const bname = document.getElementById('bname').value;
            const mname = document.getElementById('mname').value;
            const acost = document.getElementById('acost').value;
            

            var con =  fetch('/updateAsset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}`, "snumber" : `${snumber}`, "aname" : `${aname}`,"ename" : `${ename}`, "bname" : `${bname}`, "mname" : `${mname}`
                , "acost" : `${acost}`})
            });

            window.location.reload();
        });

    } catch (error) {
        console.error('Error editing employee:', error);
    }
}


async function deleteemployee(id) {
    try {
        var con = await fetch('/deleteEmployee', {
            method: "DELETE",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });
        window.location.reload();
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}

