fetching('/categoryfetch');
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
        table = new DataTable('#category_master', {          
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
                    data: 'name', 
                     "mData": null, 
                    "bSortable": false, 
                    "sClass": "alignCenter", 
                    
                }, 
                { 
                    data: 'createdAt',
                    "render" : (data) => moment(data).format('LL'),
                    "mData": null, 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: 'updatedAt', "mData": null,
                    "render" : (data) => moment(data).format('LL'), 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: null, 
                    "bSortable": false, 
                    // "Width":"3%", 
                    "render": function (data) { 
                        return `<div class="mx-auto"><a class="btn btn-warning btn-sm btn-size" data-id =  ${data.id}   onclick="editemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#editmodalId">Edit</a></div>`
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

// Edit Rows in Asset Category Table
    async function editemployee(id) {
        try {
            var con = await fetch('/assetcategory', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            var data = await con.json();
            document.getElementById('cname').value = data.name;

            const form = document.getElementById('CategoryForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const cname = document.getElementById('cname').value;
                
                var con =  fetch('/updateAssetCategory', {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${id}`, "cname" : `${cname}`})
                });

                window.location.reload();
            });

        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }
