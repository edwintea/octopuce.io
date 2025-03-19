//////////////////////// INDEX ////////////////////////////
let Index={
    init    :   ()=>{
                    
        const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#txtRegisterPassword");

        const togglePassword1 = document.querySelector("#togglePassword1");
        const password1 = document.querySelector("#txtRegisterPasswordConfirmation");

        const togglePassword2 = document.querySelector("#togglePassword2");
        const password2 = document.querySelector("#txtLoginPassword");
        
        togglePassword.addEventListener("click", function () {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            
            // toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        togglePassword1.addEventListener("click", function () {
            const type = password1.getAttribute("type") === "password" ? "text" : "password";
            password1.setAttribute("type", type);
            
            // toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        togglePassword2.addEventListener("click", function () {
            const type = password2.getAttribute("type") === "password" ? "text" : "password";
            password2.setAttribute("type", type);
            
            // toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        
        var forms = document.querySelectorAll('.needs-validation-register')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    
                }
                
                form.classList.add('was-validated')

                if (form.checkValidity()) {
                    req={
                        name      : $('#txtRegisterName').val()+" "+$('#txtRegisterLastName').val(),
                        phone     : $('#countryCode').find(':selected').val()+" "+$('#txtRegisterPhone').val(),
                        email     : $('#txtRegisterEmail').val(),
                        password  : $('#txtRegisterPassword').val()
                    }
            
                    //onProcess('frmRegister','Loading ...')
                    Ajax(Api.Users.register.URL,Api.Users.register.Method,req,function(){
                        //endProcess('frmRegister','Register')
                        console.log(res);
                        
                        if(res.status){
                            notify(res.message,"info")
                            $('#btnLogin').trigger('click')
                            
                        }else{
                            $('#txtRegisterEmail').val('').focus()
                            notify('Email has been registered','error')
                            
                        }
                    
                    })

                }
                event.preventDefault()
            }, false)
        })

        
        var forms1 = document.querySelectorAll('.needs-validation-login')
        Array.prototype.slice.call(forms1)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
                if (form.checkValidity()) {
                    req={
                        email       : $('#txtLoginEmail').val(),
                        password    : $('#txtLoginPassword').val()
            
                        }
                        
                    //onProcess('frmLogin','Loading ...')
                    
                    Ajax(Api.Users.Login.URL,"POST",req,function(){
                        //endProcess('frmLogin','Loading ...')
                        
                        if(res.status){
                            setSession();
                            /*
                            socket.emit('client', 
                                {
                                    name:req.email,
                                    email:req.email,
                                    message:MESSAGE.LOGIN_SUCCESS
                                }
                            );
                            */
                            window.location.href=ACCOUNT_URL;
                        }else{
                            notify("Invalid Account!",'error')
                            
                        }
                    })

                }

                event.preventDefault();
            }, false)
        })

        
        $('#btnLogin').off().on('click',function(){
            $('#frmRegister').hide();
            $('#frmLogin').show();
            $('#notyet').show();
            $('#already').hide();
            return false;
        })

        $('#btnRegister').off().on('click',function(){
            $('#frmRegister').show();
            $('#frmLogin').hide();
            $('#already').show();
            $('#notyet').hide();
            return false;
        })

        /*
        $('#frmForgot').validate({
            submitHandler: function(form) {
                req={
                    email : $('#txtForgotEmail').val()
                }
    
                onProcess('frmForgot','Loading ...')
                Ajax(Api.Users.Forgot.URL,Api.Users.Forgot.Method,req,function(){
                    endProcess('frmForgot','Send Link')
                    console.log(res);
                    
                    if(res.status){
                        $('#viewModalDemo').modal();
                        $('.vLogin').hide();
                        $('.vRegister').hide();
                        $('.vPass').hide();
                        $('.vConfirmRegister').hide();
                        $('.vConfirmPass').show();
                        $('#txtForgotEmail').val('')
                        
                    }else{
                        $('#txtForgotEmail').val('').focus();
                        alert("Invalid Account!")
                    }
                
                })
                
            }
        });
        */
    }
}
Index.init();