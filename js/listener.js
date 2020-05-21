const adminLinks = document.querySelectorAll('.admin')
const playerLinks = document.querySelector('.my-achievements-link')



// Listen for auth state
auth.onAuthStateChanged(user => {
    
    if(user) {
                
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            
            if(!user.admin) {
                
                // Hide admin panel
                adminLinks.forEach(item => item.style.display = 'none');
                $('.img-profile-name').text(user.email);


                // Show player panel
                playerLinks.style.display = 'block';

            } 
            else if (user.admin) {
                //console.log(`User ${user.email} is admin.`);
                
                // Show admin panel
                adminLinks.forEach(item => item.style.display = 'block');
                $('.img-profile-name').text("Admin");

                // Hide player panel
                playerLinks.style.display = 'none';
            
            } 

        })


    } else {
        console.log("User logged out: ", user);
    
    }
});








