// const loginHTMLForm = document.querySelector('#login-html-form')
const email = $('#email-html-input')
const password = $('#password-html-input')
// let emailUp = $('#ema-input')
// let passwordUp = $('#pass-input')
// let slogan = $('#slogan-input')



// Sign-In
loginHTMLForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    let obj = { 
        email: loginHTMLForm["email-html-input"].value, 
        password: loginHTMLForm["password-html-input"].value 
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
             
         })
         .catch(err => {
             console.log("err", err)
             $('.alert-danger-login').text(err.message);
         })

})


