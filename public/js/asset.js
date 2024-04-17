
fetching('/asset/assetfetch')
async function fetching(url) { 
    try { 
        var res = await fetch(url); 
        var data = await res.json(); 
        
        if(data.result.message){ 
            alert(data.result.message); 
            sessionStorage.removeItem('token'); 
            window.location="/" 
        } 
        table = new DataTable('#asset_master', {          
            data: data.result, 
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
                        <div class="mx-auto"><a id=scrap` + data.id +` class="btn btn-danger btn-sm btn-size"  data-id =  ${data.id}   onclick="scarpemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#scarpmodalId">Scrap</a></div>
                        <div class="mx-auto"><a id=assetissue` + data.id +`  class="btn btn-info btn-sm btn-size" data-id =  ${data.id}   onclick="issueemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#issuemodalId">Issue</a></div>
                        <div class="mx-auto"><a id=returnbutton` + data.id +`   class="btn btn-primary btn-sm btn-size hidden" data-id =  ${data.id}   onclick="returnemployee(this.getAttribute('data-id'))" data-bs-toggle="modal" data-bs-target="#returnmodalId">Return</a></div>`;
                    } 
                } 
            ], 
            autoWidth:true, 
        }); 
        buttonhide();
    } 
    catch (e) { 
        console.log(e); 
    } 
}


// To toggle the Issue and Return Button
    async function buttonhide() {
        let assettablepromise = await fetch('/asset/fetching/asset', { method: 'POST', headers: { 'content-type': 'application/json', 'auth': sessionStorage.getItem('token') } });
        let assettabledata = await assettablepromise.json();
        // console.log('assettable:', assettabledata);

        for (let i of assettabledata) {
            if (i.status == 0) {
                var returnbutton = document.getElementById(`returnbutton${i.id}`)
                returnbutton.style.display = 'none';
                var issue = document.getElementById(`assetissue${i.id}`);
                issue.style.display = 'inline-block'
                var scrap = document.getElementById(`scrap${i.id}`);
                scrap.style.display = 'display'
            }
            else if (i.status == 1) {
                var returnbutton = document.getElementById(`returnbutton${i.id}`)
                returnbutton.style.display = 'inline-block';
                var issue = document.getElementById(`assetissue${i.id}`);
                var scrap = document.getElementById(`scrap${i.id}`);
                issue.style.display = 'none'
                scrap.style.display = 'none'
            }
        }
    }


// Create Asset Table
    fun();
    async function fun(){
        var response = await fetch('/asset/fetching/assetName');
        var data = await response.json();
        var CreateAssetName = '#createaname1'; 
        fetchAssetName(data.result, CreateAssetName);
    }
        const form = document.getElementById('createassetForm');
        form.addEventListener('submit',async function(event) {
        event.preventDefault();
        
        const snumber = document.getElementById('createsnumber').value;
        const aname1 = document.getElementById('createaname1').value;
        const bname = document.getElementById('createbname').value;
        const mname = document.getElementById('createmname').value;
        const acost = document.getElementById('createacost').value;
        
        var con = await fetch('/asset/createasset', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({"snumber" : `${snumber}`,"aname1" : `${aname1}`,"bname" : `${bname}`,"mname" : `${mname}`,"acost" : `${acost}`})
        });
        
        var data = await con.json();
        console.log(data.result);
        if(data.success == true)
            window.alert("Asset is Created successfully")
        else    
            window.alert(data.error)

            window.location.reload();

    });

// To Display Asset Name and Id In the Form 
    function fetchAssetName(data , id) {
        var issueassetname = document.querySelector(id);
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            var val = data[i].id + ' - ' + data[i].name;
            var option = `<option value="${data[i].name}" assetid='${data[i].id}'>${val}</option>`
            issueassetname.innerHTML += option;
        }
    }


// Edit Rows in Asset Table
    async function editemployee(id) {
        try {
            var con = await fetch('/asset/editasset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            if(con.success == false)
                alert(con.error || "Couldn't able to Fetch Data");

            var response = await fetch('/asset/fetching/assetName');
            var data = await response.json();
            var AssetNameEdit = '#editaname2'; 
            fetchAssetName(data.result , AssetNameEdit);

            var data = await con.json();
            var num = data.result.serialNumber;
            document.getElementById("editsnumber").value = num;
            document.getElementById('editaname2').value = data.result.assetName;
            document.getElementById('editbname').value = data.result.brandName;
            document.getElementById('editmname').value = data.result.model;
            document.getElementById('editacost').value = data.result.assetCost;

            const form = document.getElementById('AssetForm');
            form.addEventListener('submit',async function(event) {
                event.preventDefault();
                const snumber = document.getElementById('editsnumber').value;
                const aname = document.getElementById('editaname2').value;
                const bname = document.getElementById('editbname').value;
                const mname = document.getElementById('editmname').value;
                const acost = document.getElementById('editacost').value;
                
                
                var con = await fetch('/asset/updateAsset', {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${id}`, "snumber" : `${snumber}`, "aname" : `${aname}`, "bname" : `${bname}`, "mname" : `${mname}`
                    , "acost" : `${acost}`})
                });
                
                var data = await con.json();
                if(data.success == true)
                    window.alert("Asset is Edited successfully")
                else    
                    window.alert(data.error)

                window.location.reload();
            });
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }


// Delete Rows in Asset Table
    async function scarpemployee(id) {
        try {
            var con = await fetch('/asset/editasset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            if(con.success == false)
                alert(con.error || "Couldn't able to Fetch Data");

            var data = await con.json();
            document.getElementById('scarpassetname').value =data.result.assetName;
            const name = data.result.assetName
            const issueDate = moment(data.result.createdAt).format("DD-MM-YYYY");
            document.getElementById('pdate').value = moment(data.result.createdAt).format("DD-MM-YYYY");

            var response = await fetch('/asset/fetching/asset/employee');
            var data = await response.json();
            var EmployeeName = '#Employeeid'; 
            fetchEmployeeName(data.result , EmployeeName);

            const form = document.getElementById('AssetScarpForm');
            form.addEventListener('submit',async function(event) {
                event.preventDefault();
                const Employeeid = document.getElementById('Employeeid').value;
                const scarpassetname = name;
                const pdate = issueDate;
                const sdate = document.getElementById('scrapdate').value;
                const reason = document.getElementById('reason').value;
        
                var CurrDate = new Date();
                CurrDate = moment(CurrDate).format("DD-MM-YYYY");
                
                var con = await fetch('/asset/updatescarp', {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({"Employeeid" : `${Employeeid}` , "scarpassetname" : `${scarpassetname}` , "pdate" : `${pdate}` ,"sdate" : `${sdate}` ,"reason" : `${reason}`, "CurrDate" : `${CurrDate}`})
                });

                var data = await con.json();
                if(data.success == true)
                    window.alert("Asset History is Created successfully")
                else    
                    window.alert(data.error)


                var con = await fetch('/asset/deleteEmployee', {
                    method: "DELETE",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${id}` })
                });
                var deleteAsset = await con.json();
                if(deleteAsset.success == true)
                    window.alert("Asset is Deleted successfully")
                
                window.location.reload();
            });

        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }


// Issue Asset Details
    async function issueemployee(id) {
        try {
            var con = await fetch('/asset/editasset', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });
            
            if(con.success == false)
                alert(con.error || "Couldn't able to Fetch Data");

            var data = await con.json();
            var assetName = data.result.assetName;

            var response = await fetch('/asset/fetching/asset/employee');
            var fetchdata = await response.json();
            var IssueName = '#issuename';
            fetchEmployeeName(fetchdata.result , IssueName);

            // var ReturnCheck = await fetch('/asset/edithistory', {
            //     method: "POST",
            //     headers: { "Content-Type" : "application/json" },
            //     body: JSON.stringify({ "id" : `${id}` })
            // });
            // var Fetchreturn = await ReturnCheck.json();

            // if(Fetchreturn.result.returnDate)
            // {
            //     var returnDate = Fetchreturn.result.returnDate;
            //     returnDate = moment(returnDate).format("DD-MM-YYYY");
            // }

            const form = document.getElementById('issueassetForm');
            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                const issueid = document.getElementById('issuename').value;
                var idate = document.getElementById('idate').value;
                var CurrDate = new Date();
                CurrDate = moment(CurrDate).format("DD-MM-YYYY");
                idate = moment(idate).format('DD-MM-YYYY');


                var con = await fetch('/asset/EditAssetHistory', {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({"issueid" : `${issueid}`, "assetName" : `${assetName}`, "idate" : `${idate}` , "id" : `${id}`, "CurrDate" : `${CurrDate}`})
                });

                var data = await con.json();
                if(data.success == false)
                    window.alert(data.error);
                else
                {
                    const status = 1;
                    var con = await fetch('/asset/status/update', {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ "id" : `${id}`, "status" : `${status}` })
                    });
                    var UpdateStauts = await con.json();
                    if(UpdateStauts.success == true)
                        window.alert("Asset has been Issued Successfully")
                    else
                        alert(UpdateStauts.error);
                }   
                window.location.reload();
            });

        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }


// To Display Employee Name and Id In the Form 
    function fetchEmployeeName(data , id) {
        var issueassetname = document.querySelector(id);
        for (let i = 0; i < data.length; i++) {
            var val = data[i].id + ' - ' + data[i].name;
            var option = `<option value="${data[i].id}" employeeid='${data[i].id}'>${val}</option>`
            issueassetname.innerHTML += option;
        }
    }



// Return Asset Details
    async function returnemployee(id) {
        try {
            var con = await fetch('/asset/edithistory', {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ "id" : `${id}` })
            });

            if(con.success == false)
                alert(con.error || "Couldn't able to Fetch Data");

            var data = await con.json();
            var Assetid = data.result.id;
            document.getElementById("returnissuedate").value = moment(data.result.issueDate).format('DD-MM-YYYY');
            var issueDate = moment(data.result.issueDate).format('YYYY-MM-DD');
                const form = document.getElementById('returnassetForm');
                form.addEventListener('submit',async function(event) {
                    event.preventDefault();
                    var rdate = document.getElementById('returndate').value;
                    const notes = document.getElementById('notes').value;
                    var CurrDate = new Date();
                    CurrDate = moment(CurrDate).format("YYYY-MM-DD");
                    rdate = moment(rdate).format("YYYY-MM-DD");
                    
                    console.log(issueDate + " "+rdate+" "+CurrDate)
                    var con = await fetch('/asset/updateAssetreturn', {
                        method: "PUT",
                        headers: { "Content-Type" : "application/json" },
                        body: JSON.stringify({ "id" : `${Assetid}`,"issueDate" : `${issueDate}` ,"rdate" : `${rdate}`, "notes" : `${notes}` , "CurrDate" : `${CurrDate}`})
                    });
                    var data = await con.json();
                    if(data.success == false)
                        window.alert(data.error);

                    if(data.success == true){
                        const status = 0;
                        var con = await fetch('/asset/status/update', {
                            method: "PUT",
                            headers: { "Content-Type" : "application/json" },
                            body: JSON.stringify({ "id" : `${id}` , "status" : `${status}` })
                        });

                        var UpdateStatus = await con.json();
                        if(UpdateStatus.success == true)
                            window.alert("Asset has been Return Successfully")
                        else
                            window.alert(UpdateStatus.error)
                    }
                    window.location.reload();
                });     
                
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    }

