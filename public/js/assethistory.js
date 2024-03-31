    
    fun();
    async function fun(){
        const form = document.getElementById('AssetHistoryForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const ename = document.getElementById('select').value;
            const aname = document.getElementById('aname1').value;
            const idate = document.getElementById('idate').value;
            const rdate = document.getElementById('rdate').value;
            const status = document.getElementById('status').value;
            
            var con = fetch('/assethistorycreate', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "ename" : `${ename}`, "aname" : `${aname}`, "idate" : `${idate}`, "rdate" : `${rdate}`, "status" : `${status}`})
            });
            
            window.location.reload();
        });
    }



    fetching('/assethistoryfetch')
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
            table = new DataTable('#asset_history', {          
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
                        data: 'issueDate', "mData": null, 
                        "render" : (data) => moment(data).format('LL'),
                        "bSortable": false, 
                        
                    }, 
                    { 
                        data: 'returnDate',  
                        "mData": null, 
                        "bSortable": false, 
                        "render" : (data) => moment(data).format('LL'),
                        "sClass": "alignCenter" 
                    }, 
                    { 
                        data: 'status',  
                        "mData": null, 
                        "bSortable": false, 
                        
                        "sClass": "alignCenter" 
                    },
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
        var con = await fetch('/edithistory', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ "id" : `${id}` })
        });

        var data = await con.json();

        var num = data.employeeName;
        document.getElementById("ename").value = num;
        document.getElementById('aname2').value = data.assetName;
        document.getElementById('idate').value =  data.issueDate 
        document.getElementById('rdate').value = data.returnDate;
        document.getElementById('status').value = data.status;

    } catch (error) {
        console.error('Error editing employee:', error);
    }
}

        const form = document.getElementById('AssetHistoryForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const ename = document.getElementById('ename').value;
            const aname = document.getElementById('aname2').value;
            const idate = document.getElementById('idate1').value;
            const rdate = document.getElementById('rdate1').value;
            const status = document.getElementById('status1').value;

            var con = fetch('/updateassethistory', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "ename" : `${ename}`, "aname" : `${aname}`, "idate" : `${idate}`, "rdate" : `${rdate}`, "status" : `${status}`})
            });
            window.location.reload();

        });


// async function deleteemployee(id) {
//     try {
//         var con = await fetch('/deleteEmployee', {
//             method: "DELETE",
//             headers: { "Content-Type" : "application/json" },
//             body: JSON.stringify({ "id" : `${id}` })
//         });
//         window.location.reload();
//     } catch (error) {
//         console.error('Error editing employee:', error);
//     }
// }
