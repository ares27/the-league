// Listen for auth state
auth.onAuthStateChanged(user => {
    //console.log(user);

    if(user) {
        console.log("User logged in: ", user);
        //console.log("id: ", user.uid);


        // check if user exists
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;

            console.log("Admin: ", user.admin);
            
            setupUserUI(user);
            setupMyCards(user);
        })


        
        

        // Get data, with snapshot promise
        // db.collection('playercards').onSnapshot(snapshot => { 
        //     //console.log("playercards", snapshot.docs);
        //      //setupMyCards(snapshot.docs);
        //     let items = snapshot.docs;
        //     items.forEach(doc => {
        //         //console.log(doc.data());
        //     }) 
        // });
        
           


        
    } else {
        console.log("User logged out: ", user);
             
        setupUserUI();
    }
});








