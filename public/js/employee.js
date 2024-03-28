fetching('/employee')
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
        table = new DataTable('#employee_master', {          
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
                    data: 'name', 
                     "mData": null, 
                    "bSortable": false, 
                    "sClass": "alignCenter", 
                    
                }, 
                { 
                    data: 'email', "mData": null, 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: 'age', "mData": null, 
                    "bSortable": false, 
                     
                }, 
                { 
                    data: 'mobile',  
                    "mData": null, 
                    "bSortable": false, 
                     
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'address',  
                    "mData": null, 
                    "bSortable": false, 
                     
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'role', "mData": null, 
                    "bSortable": false, 
                  
                    // "sClass": "alignCenter" 
                }, 
                { 
                    data: 'bloodGroup', "mData": null, 
                    "bSortable": false, 
                 
                    // "sClass": "alignCenter" 
                }, 
                { 
                    data: 'salary', "mData": null, 
                    "bSortable": false, 
                 
                    // "sClass": "alignCenter" 
                }, 
                { 
                    data: 'status', "mData": null, 
                    // "bSortable": false, 
                
                    "sClass": "alignCenter" 
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



async function editemployee(id) {
    try {
        var con = await fetch('/employees', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();
        var name = data.name;

        console.log(data.joiningDate+" "+data.bloodGroup +" "+data.status+" "+data.salary+ " "+name);
        document.getElementById('name').value = name;
        document.getElementById('email').value = data.email;
        document.getElementById('age').value = data.age;
        document.getElementById('mobile').value = data.mobile;
        document.getElementById('address').value =data.address;
        document.getElementById('role').value = data.role;
        document.getElementById('bgroup').value = data.bloodGroup;
        document.getElementById('salary').value = data.salary;
        document.getElementById('status').value = data.status;
        

        const form = document.getElementById('UpdateEmployee');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const mobile = document.getElementById('mobile').value;
            const address = document.getElementById('address').value;
            const role = document.getElementById('role').value;
            const bgroup = document.getElementById('bgroup').value;
            const salary = document.getElementById('salary').value;
            const status = document.getElementById('status').value;
            
            var con =  fetch('/updateEmployee', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}`, "name" : `${name}`, "email" : `${email}`, "age" : `${age}`, "mobile" : `${mobile}`
                , "address" : `${address}`, "role" : `${role}`, "bgroup" : `${bgroup}`, "salary" : `${salary}`, "status" : `${status}` })
            });

            window.location.reload();
        });


    } catch (error) {
        console.error('Error editing employee:', error);
    }
}





