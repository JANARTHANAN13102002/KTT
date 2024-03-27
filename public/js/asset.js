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
            buttons: ['copy', { extend: 'excel', "title": "Employees" }, { extend: 'pdf', 'title': 'Employee' }], 
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
                    "sClass": "alignCenter", 
                    
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
                    data: 'employeeId', "mData": null, 
                    "bSortable": false, 
                 
                    // "sClass": "alignCenter" 
                },
                { 
                    data: 'AssetCategoryId', "mData": null, 
                    "bSortable": false, 
                 
                    // "sClass": "alignCenter" 
                },
                { 
                    data: null, 
                    "bSortable": false, 
                    // "Width":"3%", 
                    "render": function (data) { 
                        return `<div class="mx-auto"><a class="btn btn-primary btn-sm btn-size" data-id =  ${data.id}   onclick="editemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#editmodalId">Edit</a>`
                    } 
                } 
            ], 
            autoWidth: true, 
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

        document.getElementById("snumber").value=num;
        document.getElementById('aname').value = data.assetName;
        document.getElementById('bname').value = data.brandName;
        document.getElementById('mname').value = data.model;
        document.getElementById('acost').value = data.assetCost;
        document.getElementById('eid').value = data.employeeId;
        document.getElementById('aid').value = data.AssetCategoryId;

        const form = document.getElementById('AssetForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const snumber = document.getElementById('snumber').value;
            const aname = document.getElementById('aname').value;
            const bname = document.getElementById('bname').value;
            const mname = document.getElementById('mname').value;
            const acost = document.getElementById('acost').value;
            const eid = document.getElementById('eid').value;
            const aid = document.getElementById('aid').value;
            

            var con =  fetch('/updateAsset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}`, "snumber" : `${snumber}`, "aname" : `${aname}`, "bname" : `${bname}`, "mname" : `${mname}`
                , "acost" : `${acost}`, "eid" : `${eid}`, "aid" : `${aid}`})
            });

            window.location.reload();
        });

    } catch (error) {
        console.error('Error editing employee:', error);
    }
}
