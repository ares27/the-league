//const signInForm = document.querySelector('#login-form')
const signInForm = document.querySelector('#login-html-form')

// Sign-In
signInForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    let obj = { 
        email: signInForm["email-html-input"].value, 
        password: signInForm["password-html-input"].value 
    };    
    console.log(obj);
    
    // login user 
    auth.signInWithEmailAndPassword(obj.email, obj.password)
        .then(cred => {
            //console.log(cred.user);  

            //reset input fields


            // set alert err message
            $('.alert-danger-login').text('');

            // go to url when logged in
            window.location.href = "./routes/home.html";
            //window.location.href = "./routes/index.html";
        })
        .catch(err => {
            console.log("err", err)
            $('.alert-danger-login').text(err.message);
        })
            
   
    // reset form inputs
    signInForm.reset();

})
