    fetching('/assethistory/assethistoryfetch')
    async function fetching(url) { 
        try { 
            var res = await fetch(url); 
            var data = await res.json(); 
             
            if(data.result.message){ 
                alert(data.result.message); 
                sessionStorage.removeItem('token'); 
                window.location="/" 
            } 
            table = new DataTable('#asset_history', {          
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
                    {"className": "text-center", "targets":[]} 
                ], 
                
                columns: [ 
                    { 
                        data: 'id', 
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
                        "render" : (data) => data && moment(data).format('LL') || '',
                        "sClass": "alignCenter" 
                    },
                    { 
                        data: 'scrapDate',  
                        "mData": null, 
                        "bSortable": false, 
                        "render" : (data) => data && moment(data).format('LL') || '',
                        "sClass": "alignCenter" 
                    },
                    { 
                        data: 'notes',  
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


// Edit Rows in History Table
    async function editemployee(id) {
        try {
            var con = await fetch('/assethistory/editHistoryName', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            if(con.success == false)
                alert(con.error || "Couldn't able to Fetch Data");

            var data = await con.json();

            console.log(data.result);

            document.getElementById('editAname').value = data.result.assetName;
            document.getElementById('idate1').value = moment(data.result.issueDate).format('YYYY-MM-DD'); 
            document.getElementById('rdate1').value = moment(data.result.returnDate).format('YYYY-MM-DD'); 
            document.getElementById('scrapdate').value = moment(data.result.scrapDate).format('YYYY-MM-DD'); 
            document.getElementById('notes').value = data.result.notes;  
            

            const form = document.getElementById('AssetHistoryForm');
            form.addEventListener('submit',async function(event) {
                event.preventDefault();
                const aname = document.getElementById('editAname').value;
                const idate = document.getElementById('idate1').value;
                var rdate = document.getElementById('rdate1').value;
                const notes = document.getElementById('notes').value;
                var status = document.getElementById('scrapdate').value;

                var CurrDate = new Date();
                CurrDate = moment(CurrDate).format("DD-MM-YYYY");
                if(rdate)
                    rdate = moment(rdate).format("DD-MM-YYYY");
                if(status)
                    status = moment(status).format("DD-MM-YYYY");

                    
                var con = await fetch('/assethistory/updateassethistoryScrap', {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({"id" : `${id}`, "CurrDate" : `${CurrDate}`, "status" : `${status}`, "aname" : `${aname}`, "idate" : `${idate}`, "notes" : `${notes}` , "rdate" : `${rdate}`})
                });

                var data = await con.json();
                if(data.success == false)
                    window.alert(data.error);
                else   
                    window.alert("AssetHistory Details Edit is Successful")

                window.location.reload();
            });
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }
  

// Delete Rows in History Table
    async function deleteemployee(id) {
        try {
            var con = await fetch('/assethistory/deleteassetHistory', {
                method: "DELETE",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });
            window.location.reload();
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }

