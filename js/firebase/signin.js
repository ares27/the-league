const signInForm = document.querySelector('#login-form')
let email = $('#email-input')
let password = $('#password-input')
let emailUp = $('#ema-input')
let passwordUp = $('#pass-input')
let slogan = $('#slogan-input')
const signUpForm = document.querySelector('#signup-form')


// Sign-In
signInForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    let obj = { 
        email: signInForm["email-input"].value, 
        password: signInForm["password-input"].value 
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
            window.location.href = "/routes/home.html";
        })
        .catch(err => {
            console.log("err", err)
            $('.alert-danger-login').text(err.message);
        })
            
   
    // reset form inputs
    signInForm.reset();

})



// Sign-Up
signUpForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    let obj = { 
        email: signUpForm["ema-input"].value, 
        password: signUpForm["pass-input"].value,
        name: signUpForm["name-input"].value,
        slogan: signUpForm["slogan-input"].value 
    };    
    console.log(obj);
    
    // login user 
      auth.createUserWithEmailAndPassword(obj.email, obj.password)
        .then(cred => {
            //console.log("User created: ", cred.user);  

            // create new player
            return db.collection('players').doc(cred.user.uid).set({
                email: signUpForm["ema-input"].value,
                name: signUpForm["name-input"].value,
                slogan: signUpForm["slogan-input"].value
            });
        })
        .then(() => {

            // reset form inputs
            signInForm.reset();

            // set err
            $('.alert-danger-signup').text('');

            // goto when logged in
            window.location.href = "/routes/home.html";
        })
        .catch(err => {
            console.log(err);
            $('.alert-danger-signup').text(err);
        })
   
})



