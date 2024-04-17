        const form = document.getElementById('registerForm');
        if(form) {
            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                
                const name = document.getElementById('inputName').value;
                const email = document.getElementById('inputEmail').value;
                const inputPassword = document.getElementById('inputPassword').value;
                const inputPasswordConfirm = document.getElementById('inputPasswordConfirm').value;


                if(inputPassword.length < 8)
                    alert("Password needs to be at least 8 characters")
                else if(inputPassword !== inputPasswordConfirm)
                    alert("Password and ConfirmPassword is not Matched")
                else if(inputPassword.search(/[a-z]/) < 0) 
                    alert("Error: Password must contain at least one lowercase letter"); 
                else if(inputPassword.search(/[A-Z]/) < 0)  
                    alert("Error: Password must contain at least one uppercase letter"); 
                else if(inputPassword.search(/[0-9]/) < 0) 
                    alert("Error: Password must contain at least one number"); 
                else {
                    var con = await fetch('/register/create', {
                        method: "POST",
                        headers: { "Content-Type" : "application/json" },
                        body: JSON.stringify({ "name" : `${name}` , "email" : `${email}`, "inputPassword" : `${inputPassword}`, "inputPasswordConfirm" : `${inputPasswordConfirm}`})
                    });
                    var data = await con.json();
        
                    if(data.success == true)
                    {
                        location.href='/'
                        alert("Registration Successful");
                    }
                    
                }
            });
        }
    


        const Loginform = document.getElementById("loginForm")
        Loginform.addEventListener('submit', async function (event) {
            event.preventDefault();
            const inputEmail = document.getElementById("inputEmail").value;
            const inputPassword = document.getElementById("inputPassword").value;
        
            console.log(inputEmail +" "+inputPassword);

            if(!inputEmail.trim() || !inputPassword.trim()) {
                alert("Username and Password are required");
            }
            try {
                var response = await fetch('/register/login', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ "email": `${inputEmail}`, "password": `${inputPassword}` })
                });
                var data = await response.json();
                console.log(data);

                if(data.success == true) {
                    location.href='/dashboard';
                } else {
                    if(data.error === 'Invalid Email_Id') {
                        alert("Email Id is not valid");
                        window.location.reload();
                    } else {
                        alert("Password is not valid");
                        window.location.reload();
                    } 
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            } 
        });