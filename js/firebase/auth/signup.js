const signUpForm = document.querySelector('#signup-form')

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
            date: Date.now(),
            createdDate: Date().substring(0, 15), 
            email: signUpForm["ema-input"].value,
            name: signUpForm["name-input"].value,
            slogan: signUpForm["slogan-input"].value
        });
    })
    .then(() => {

        // reset form inputs
        signUpForm.reset();

        // set err
        $('.alert-danger-signup').text('');

        // goto when logged in
        window.location.href = "./routes/home.html";
    })
    .catch(err => {
        console.log(err);
        $('.alert-danger-signup').text(err);
    })
   
})