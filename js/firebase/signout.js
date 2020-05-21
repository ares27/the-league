const logoutBtn = $('.logout-btn')

// Sign-Out
logoutBtn.on('click', () => {
    //console.log("logged out:");
    auth.signOut()
        .then(res => {
            console.log("User logged out: ", res);
            
            // navigate to index page
            // window.location.href = "../index.html";
            window.location.href = "/";
        })
})

