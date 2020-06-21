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

        // Set total Matches
        db.collection('matches').get().then(snapshot => {
            $('.total-matches-div').text(snapshot.docs.length);         
        }).catch(err => {
            console.log("Error - cannot get total matches: ", err);
        });

        // Set total Players
        db.collection('players').get().then(snapshot => {
            $('.total-players-div').text(snapshot.docs.length);         
        }).catch(err => {
            console.log("Error - cannot get total players: ", err);
        });

        // Get avatar fileName
        storage.refFromURL("gs://the-league-66947.appspot.com/playerAvatar/"+user.uid).list()
        .then(doc => {
            const item = doc.items[0];

            item.getDownloadURL().then(res => {
                console.log("res:", res)

                // insert avatar
                $('.img-profile').attr('src', res);
                
            });      
        })
        


    } else {
        console.log("User logged out: ", user);
    
    }
});








