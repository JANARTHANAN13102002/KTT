fetching('/employee/displayemployee')
async function fetching(url) { 
    try { 
        var res = await fetch(url); 
        var data = await res.json(); 
        
        if(data.result.message){ 
            alert(data.result.message); 
            sessionStorage.removeItem('token'); 
            window.location="/" 
        } 
        table = new DataTable('#employee_master', {          
            data: data.result, 
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
                {"className": "text-center", "targets":[]} ,
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
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'bloodGroup', "mData": null, 
                    "bSortable": false,
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'salary', "mData": null, 
                    "bSortable": false, 
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: 'status', "mData": null, 
                    "bSortable": false, 
                    "sClass": "alignCenter" 
                }, 
                { 
                    data: null, 
                    "bSortable": false, 
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




// Creating New Row in Employee Table 
        const form = document.getElementById('employeeForm');
        form.addEventListener('submit',async function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const mnumber = document.getElementById('mnumber').value;
            const address = document.getElementById('address').value;
            const role = document.getElementById('role').value;
            const bgroup = document.getElementById('bgroup').value;
            const salary = document.getElementById('salary').value;
            const status = document.getElementById('status').value;

            
            var con = await fetch('/employee/submit', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "name" : `${name}`, "email" : `${email}`, "age" : `${age}`, "mnumber" : `${mnumber}`,
                "address" : `${address}`, "role" : `${role}`, "bgroup" : `${bgroup}`, "salary" : `${salary}`, "status" : `${status}`})
            });

            var data = await con.json();
            if(data.success == false)
                window.alert(data.error);
            else   
                window.alert("Employee Details is Created")

        window.location.reload();
        });

// Creating Connection




// Edit Rows in Employee Table
    async function editemployee(id) {
        try {
            var con = await fetch('/employee/employees', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            if(con.success == false){
                alert(con.error || "Not able to Fetch");
            }

            var data = await con.json();

            var name = data.result.name;
            document.getElementById('editname').value = name;
            document.getElementById('editemail').value = data.result.email;
            document.getElementById('editage').value = data.result.age;
            document.getElementById('editmobile').value = data.result.mobile;
            document.getElementById('editaddress').value =data.result.address;
            document.getElementById('editrole').value = data.result.role;
            document.getElementById('editbgroup').value = data.result.bloodGroup;
            document.getElementById('editsalary').value = data.result.salary;
            document.getElementById('editstatus').value = data.result.status;
            

            const form = document.getElementById('UpdateEmployee');
            form.addEventListener('submit',async function(event) {
                event.preventDefault();
                const name = document.getElementById('editname').value;
                const email = document.getElementById('editemail').value;
                const age = document.getElementById('editage').value;
                const mobile = document.getElementById('editmobile').value;
                const address = document.getElementById('editaddress').value;
                const role = document.getElementById('editrole').value;
                const bgroup = document.getElementById('editbgroup').value;
                const salary = document.getElementById('editsalary').value;
                const status = document.getElementById('editstatus').value;
                
                var con = await fetch('/employee/updateEmployee', {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${id}`, "name" : `${name}`, "email" : `${email}`, "age" : `${age}`, "mobile" : `${mobile}`
                    , "address" : `${address}`, "role" : `${role}`, "bgroup" : `${bgroup}`, "salary" : `${salary}`, "status" : `${status}` })
                });

                var data = await con.json();
                if(data.success == false)
                    window.alert(data.error);
                else   
                    window.alert("Employee Details is Edited")

            window.location.reload();
            });
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }





